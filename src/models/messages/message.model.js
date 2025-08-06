const { Message, User } = require('../index');

async function createMessage({ match_id, sender_id, text }) {
  const newMessage = await Message.create({ match_id, sender_id, text });
  return newMessage;
}

async function getMessagesByMatchId(match_id) {
  const messages = await Message.findAll({
    where: { match_id },
    order: [['timestamp', 'ASC']],
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['id', 'name']
      }
    ]
  });
  return messages;
}

module.exports = {
  createMessage,
  getMessagesByMatchId
};
