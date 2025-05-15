const express = require('express');
const router = express.Router();

// Hardcoded trending cities data
const trendingCities = [
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sydney',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Rome',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80',
  },
];

router.get('/', (req, res) => {
  res.json({ success: true, data: trendingCities });
});

module.exports = router; 