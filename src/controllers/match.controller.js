const { Match, User } = require('../models');
const { Op } = require('sequelize');

const getMutualMatches = async (req, res) => {
  const userId = req.userId;

  console.log('userId recibido en getMutualMatches:', userId);

  try {
    const matches = await Match.findAll({
      where: {
        [Op.or]: [
          { user_id: userId },
          { matched_user_id: userId }
        ]
      },
      include: [
        {
          model: User,
          as: 'matchedUser',
          attributes: ['id', 'name', 'email', 'career', 'age', 'gender'],
        },
      ],
    });

    console.log('📦 Matches encontrados en DB:', JSON.stringify(matches, null, 2));


    const mutualMatches = await Promise.all(
      matches.map(async match => {
        console.log('🔍 Procesando match:', match);
        if (parseInt(match.user_id) === parseInt(userId)) {
          console.log('👤 Usuario actual es el swiper:', match.matchedUser);
          return match.matchedUser;
        } else {
          console.log('👤 Usuario actual es el swiped, buscando info del swiper');
          const user = await User.findByPk(match.user_id, {
            attributes: ['id', 'name', 'email', 'career', 'age', 'gender']
          });
          return user;
        }
      })
    );

    console.log('✅ Matches mutuos procesados:', mutualMatches);

    res.status(200).json({
      success: true,
      message: mutualMatches.length > 0
        ? 'Matches mutuos encontrados'
        : 'No tienes matches aún',
      data: mutualMatches
    });

  } catch (error) {
    console.error('Error en getMutualMatches:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los matches mutuos',
      data: null
    });
  }
};


module.exports = { getMutualMatches };
