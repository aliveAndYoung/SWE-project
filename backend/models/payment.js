const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            required: true,
            default: "USD",
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["visa", "mastercard", "paypal"],
        },
        paymentDetails: {
            cardNumber: {
                type: String,
                required: function () {
                    return (
                        this.paymentMethod === "visa" ||
                        this.paymentMethod === "mastercard"
                    );
                },
                select: false,
            },
            expiryDate: {
                type: String,
                required: function () {
                    return (
                        this.paymentMethod === "visa" ||
                        this.paymentMethod === "mastercard"
                    );
                },
            },
            cvv: {
                type: String,
                required: function () {
                    return (
                        this.paymentMethod === "visa" ||
                        this.paymentMethod === "mastercard"
                    );
                },
                select: false,
            },
        },
        transactionId: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        refundAmount: {
            type: Number,
            default: 0,
        },
        refundReason: {
            type: String,
        },
        refundDate: {
            type: Date,
        },
        metadata: {
            type: Map,
            of: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ transactionId: 1 }, { unique: true });

// Method to process refund
paymentSchema.methods.processRefund = async function (refundAmount, reason) {
    if (refundAmount > this.amount) {
        throw new Error("Refund amount cannot exceed payment amount");
    }

    this.refundAmount = refundAmount;
    this.refundReason = reason;
    this.refundDate = new Date();
    this.status = "refunded";

    return this.save();
};

// Method to verify payment
paymentSchema.methods.verifyPayment = async function () {
    // Here you would typically integrate with a payment gateway
    // For now, we'll simulate verification
    if (this.status === "pending") {
        this.status = "completed";
        await this.save();
        return true;
    }
    return false;
};

module.exports = mongoose.model("Payment", paymentSchema);
