const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true }, // ISO date string
  time: { type: String, required: true }, // e.g. '09:00'
  airline: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Flight', FlightSchema); 