const express = require('express');
const { createSwipeController, getSwipesByUserController } = require('../controllers/swipe.controller');

const router = express.Router();

// Crear un swipe (like/dislike)
router.post('/', createSwipeController);

// Obtener todos los swipes realizados por un usuario
// Por ejemplo: GET /api/swipes/user/123
router.get('/user/:userId', getSwipesByUserController);

module.exports = router;
