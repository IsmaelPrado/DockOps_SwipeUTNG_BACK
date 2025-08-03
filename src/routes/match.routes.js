// routes/match.routes.js
const express = require('express');
const router = express.Router();
const { getMutualMatches } = require('../controllers/match.controller');

// Ruta corregida:
router.get('/matches/mutual/:userId', getMutualMatches);

module.exports = router;
