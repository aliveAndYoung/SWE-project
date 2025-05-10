const express = require("express");
const {
    createPayment,
    getPaymentHistory,
    getPayment,
    processRefund,
    verifyPayment,
} = require("../controllers/paymentController");
const { authenticate } = require("../middlewares/authentication");

const router = express.Router();

// All routes are protected and require authentication
router.use(authenticate);

// Create new payment
router.post("/", createPayment);

// Get payment history
router.get("/history", getPaymentHistory);

// Get single payment
router.get("/:id", getPayment);

// Process refund
router.post("/:id/refund", processRefund);

// Verify payment
router.get("/:id/verify", verifyPayment);

module.exports = router;
