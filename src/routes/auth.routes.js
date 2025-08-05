// routes/auth.routes.js
const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/authenticateToken');
const validateRequestBody = require('../middlewares/validateRequestBody');

const router = express.Router();

// Solo en POST aplicamos el validador
router.post('/register', validateRequestBody, register);
router.post('/login', validateRequestBody, login);
router.get('/auth/me', authenticateToken, getMe); // no lleva body

module.exports = router;
