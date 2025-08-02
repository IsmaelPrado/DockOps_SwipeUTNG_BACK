// routes/protected.routes.js
const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { getUsuarios } = require('../controllers/user.controller');

const router = express.Router();

router.get('/usuarios', authenticateToken, getUsuarios);  // Asegurarse de que solo usuarios autenticados puedan acceder

module.exports = router;
