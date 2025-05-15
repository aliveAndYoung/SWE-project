const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// GET /api/flights?from=...&to=...&date=...&time=...
router.get('/', async (req, res) => {
  try {
    const { from, to, date, time } = req.query;
    const query = {};
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) query.date = date;
    if (time) query.time = time;
    const flights = await Flight.find(query);
    res.json({ success: true, data: flights });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/flights/:id - get a single flight by id
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ success: false, error: 'Flight not found' });
    res.json({ success: true, data: flight });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router; 