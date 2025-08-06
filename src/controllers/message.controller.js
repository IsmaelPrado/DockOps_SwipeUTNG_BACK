const { createMessage, getMessagesByMatchId } = require('../models/messages/message.model');

const createMessageController = async (req, res) => {
  try {
    const { match_id, text } = req.body;
    const sender_id = req.user.id; // Obtener id del usuario autenticado

    const newMessage = await createMessage({ match_id, sender_id, text });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error al crear mensaje:', error);
    res.status(500).json({ message: 'Error al crear mensaje' });
  }
};

const getMessagesByMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const messages = await getMessagesByMatchId(matchId);
    res.json(messages);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ message: 'Error al obtener mensajes' });
  }
};

module.exports = {
  createMessage: createMessageController,
  getMessagesByMatch,
};
