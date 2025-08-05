// routes/match.routes.js
const express = require('express');
const router = express.Router();
const { getMutualMatches } = require('../controllers/match.controller');
const authenticateToken = require('../middlewares/authenticateToken');

// Ruta corregida:
//Usar el token para identificar al usuario
router.get('/matches/mutual', authenticateToken, getMutualMatches);

module.exports = router;
