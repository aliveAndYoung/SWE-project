const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authenticate } = require('../middlewares/authentication');

// Create a new booking
router.post('/', authenticate, async (req, res) => {
  try {
    const { flightId, paymentId, status } = req.body;
    const booking = await Booking.create({
      user: req.user._id,
      flight: flightId,
      paymentId,
      status: status || 'completed',
    });
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Booking failed' });
  }
});

// Get all bookings for the logged-in user
router.get('/history', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('flight');
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

// Get all bookings for the logged-in user (by user.bookings)
router.get('/user', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('flight');
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch user bookings' });
  }
});

module.exports = router; 