const express = require('express');
const router = express.Router();
const { createMessage, getMessagesByMatch } = require('../controllers/message.controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/messages', authenticateToken, createMessage);
router.get('/messages/:matchId', authenticateToken, getMessagesByMatch);

module.exports = router;
