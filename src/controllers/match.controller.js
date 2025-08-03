// controllers/match.controller.js
const { Match, User } = require('../models');

const getMutualMatches = async (req, res) => {
  const { userId } = req.params;
  try {
    const matches = await Match.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: 'matchedUser',
          attributes: ['id', 'name', 'email', 'career', 'age', 'gender'],
        },
      ],
    });

    const mutualMatches = matches.map(match => match.matchedUser);
    res.json(mutualMatches);
  } catch (error) {
    console.error('Error en getMutualMatches:', error);
    res.status(500).json({ message: 'Error al obtener los matches mutuos' });
  }
};

module.exports = { getMutualMatches };
