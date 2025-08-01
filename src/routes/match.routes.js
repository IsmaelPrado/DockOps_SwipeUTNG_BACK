// routes/match.routes.js
const express = require('express');
const router = express.Router();
const { getMutualMatches } = require('../controllers/match.controller');

// Ruta: GET /api/matches/mutual/:userId
router.get('/matches/mutual/:userId', getMutualMatches);

module.exports = router;