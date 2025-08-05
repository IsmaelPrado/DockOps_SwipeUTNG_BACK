// sockets/socketHandler.js
const { createMessage, getMessagesByMatchId } = require('../models/messages/message.model');

module.exports = function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('🔌 Usuario conectado:', socket.id);

    // Evento para recibir nuevo mensaje desde cliente
    socket.on('sendMessage', async (messageData) => {
      try {
        // Guardar mensaje en la BD usando el service
        const savedMessage = await createMessage(messageData);

        // Opcional: puedes obtener el mensaje con datos del usuario si quieres
        // const messages = await getMessagesByMatchId(messageData.match_id);

        console.log('📨 Mensaje guardado:', savedMessage);

        // Enviar el mensaje guardado a todos (incluyendo quien lo envió)
        io.emit('newMessage', savedMessage);
      } catch (error) {
        console.error('Error guardando mensaje:', error);
        // Podrías emitir un error al cliente si quieres
        socket.emit('errorMessage', { message: 'Error al guardar mensaje' });
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Usuario desconectado:', socket.id);
    });
  });
};
