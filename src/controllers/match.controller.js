// controllers/match.controller.js
const { QueryTypes } = require('sequelize');
const { db } = require('../models/index');

async function getMutualMatches(req, res) {
  const userId = parseInt(req.params.userId, 10);

  if (!userId || isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: 'ID de usuario inválido. Debe ser un número.',
    });
  }

  try {
    const query = `
      SELECT u.id, u.name, u.age, u.career, u.gender
      FROM users u
      INNER JOIN matches m1 ON u.id = m1.user_id
      INNER JOIN matches m2 ON m2.user_id = :userId AND m2.matched_user_id = u.id
      WHERE m1.matched_user_id = :userId;
    `;

    const matchedUsers = await db.query(query, {
      type: QueryTypes.SELECT,
      replacements: { userId },
    });

    // Formatear respuesta para el frontend
    const matches = matchedUsers.map(user => ({
      id: user.id,
      matchedUser: {
        id: user.id,
        name: user.name,
        age: user.age,
        career: user.career,
        gender: user.gender,
        photos: [] // Puedes llenarlo cuando tengas fotos
      }
    }));

    return res.status(200).json(matches);

  } catch (error) {
    console.error('Error en getMutualMatches:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}

module.exports = { getMutualMatches };