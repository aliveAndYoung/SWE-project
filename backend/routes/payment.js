const express = require("express");
const {
    createPayment,
    getPaymentHistory,
    getPayment,
    processRefund,
    verifyPayment,
} = require("../controllers/paymentController");
const { authenticate } = require("../middlewares/authentication");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Flight = require('../models/Flight');

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

// Create Stripe Checkout session for booking
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { flightId } = req.body;
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ success: false, error: 'Flight not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${flight.from} to ${flight.to} (${flight.airline})`,
            },
            unit_amount: Math.round(flight.price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}&flightId=${flight._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/flights/${flight._id}`,
      metadata: {
        flightId: flight._id.toString(),
        userId: req.user._id.toString(),
      },
    });
    res.json({ success: true, url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Stripe session failed' });
  }
});

module.exports = router;
