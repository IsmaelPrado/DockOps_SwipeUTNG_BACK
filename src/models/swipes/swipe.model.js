const { Swipe, User, Match } = require('../index');
const { Op } = require('sequelize');

async function createSwipe({ swiper_id, swiped_id, is_like }) {
  // Validar que los usuarios existen
  const swiper = await User.findByPk(swiper_id);
  if (!swiper) throw new Error(`Usuario con id ${swiper_id} no existe`);

  const swiped = await User.findByPk(swiped_id);
  if (!swiped) throw new Error(`Usuario con id ${swiped_id} no existe`);

  // Evitar swipe a uno mismo
  if (swiper_id === swiped_id) throw new Error('No puedes hacer swipe a ti mismo');

  // Crear el swipe o actualizar si ya existe (opcional)
  // Aquí intento crear, y si existe, puedes decidir si actualizar o lanzar error
  let newSwipe;
  try {
    newSwipe = await Swipe.create({ swiper_id, swiped_id, is_like });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Ya hiciste swipe a este usuario');
    }
    throw err;
  }

  let match = null;

  if (is_like) {
    // Verificar si ya hay un match
    const reciprocalSwipe = await Swipe.findOne({
      where: {
        swiper_id: swiped_id,
        swiped_id: swiper_id,
        is_like: true
      }
    });
  

  if (reciprocalSwipe){
    const existingMatch = await Match.findOne({
      where: {
        [Op.or]: [
          { user_id: swiper_id, matched_user_id: swiped_id },
          { user_id: swiped_id, matched_user_id: swiper_id }
        ]
      }
    });

    if (!existingMatch) {
      match = await Match.create({
        user_id: swiper_id,
        matched_user_id: swiped_id
      });
    }
  }
}

  return { swipe: newSwipe, match };

}

async function getSwipesByUser(swiper_id) {
  return await Swipe.findAll({
    where: { swiper_id },
    include: [
      { model: User, as: 'swiped', attributes: ['id', 'name', 'email'] }
    ]
  });
}

module.exports = {
  createSwipe,
  getSwipesByUser
};
