const Payment = require("../models/payment");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const generateResponse = require("../utils/generateResponse");
const crypto = require("crypto");

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private
const createPayment = asyncHandler(async (req, res, next) => {
    const { amount, currency, paymentMethod, paymentDetails, description } =
        req.body;

    // Generate unique transaction ID
    const transactionId = crypto.randomBytes(16).toString("hex");

    const payment = await Payment.create({
        user: req.user.id,
        amount,
        currency,
        paymentMethod,
        paymentDetails,
        description,
        transactionId,
    });

    // Process payment (simulated)
    const isVerified = await payment.verifyPayment();

    if (!isVerified) {
        return next(new ErrorResponse("Payment verification failed", 400));
    }

    res.status(201).json(
        generateResponse(true, 201, {
            payment,
            message: "Payment processed successfully",
        })
    );
});

// @desc    Get payment history for a user
// @route   GET /api/payments/history
// @access  Private
const getPaymentHistory = asyncHandler(async (req, res, next) => {
    const payments = await Payment.find({ user: req.user.id })
        .select("-paymentDetails.cardNumber -paymentDetails.cvv")
        .sort("-createdAt");

    res.status(200).json(
        generateResponse(true, 200, {
            count: payments.length,
            payments,
        })
    );
});

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
const getPayment = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id).select(
        "-paymentDetails.cardNumber -paymentDetails.cvv"
    );

    if (!payment) {
        return next(new ErrorResponse("Payment not found", 404));
    }

    // Make sure user owns the payment
    if (payment.user.toString() !== req.user.id) {
        return next(
            new ErrorResponse("Not authorized to access this payment", 401)
        );
    }

    res.status(200).json(generateResponse(true, 200, payment));
});

// @desc    Process refund
// @route   POST /api/payments/:id/refund
// @access  Private
const processRefund = asyncHandler(async (req, res, next) => {
    const { refundAmount, reason } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
        return next(new ErrorResponse("Payment not found", 404));
    }

    // Make sure user owns the payment
    if (payment.user.toString() !== req.user.id) {
        return next(
            new ErrorResponse("Not authorized to refund this payment", 401)
        );
    }

    // Check if payment is eligible for refund
    if (payment.status !== "completed") {
        return next(
            new ErrorResponse("Only completed payments can be refunded", 400)
        );
    }

    try {
        await payment.processRefund(refundAmount, reason);
        res.status(200).json(
            generateResponse(true, 200, {
                payment,
                message: "Refund processed successfully",
            })
        );
    } catch (error) {
        return next(new ErrorResponse(error.message, 400));
    }
});

// @desc    Verify payment status
// @route   GET /api/payments/:id/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
        return next(new ErrorResponse("Payment not found", 404));
    }

    // Make sure user owns the payment
    if (payment.user.toString() !== req.user.id) {
        return next(
            new ErrorResponse("Not authorized to verify this payment", 401)
        );
    }

    const isVerified = await payment.verifyPayment();

    res.status(200).json(
        generateResponse(true, 200, {
            payment,
            isVerified,
            message: isVerified
                ? "Payment verified successfully"
                : "Payment verification failed",
        })
    );
});

module.exports = {
    createPayment,
    getPaymentHistory,
    getPayment,
    processRefund,
    verifyPayment,
};
