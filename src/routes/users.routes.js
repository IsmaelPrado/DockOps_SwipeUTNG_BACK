// routes/users.routes.js
const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuariosPorCarrera, getUserProfile } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticateToken');

// Ruta para obtener todos los usuarios
router.get('/usuarios', authenticateToken, getUsuarios);

// Ruta para obtener usuarios por carrera, protegida por token
router.get('/usuarios/carrera/:carrera', authenticateToken, getUsuariosPorCarrera);

// Ruta para obtener el perfil del usuario autenticado
router.get('/usuarios/me', authenticateToken, getUserProfile);

module.exports = router;
