const { Swipe, User } = require('../index');

async function createSwipe({ swiper_id, swiped_id, is_like }) {
  // Validar que los usuarios existen
  const swiper = await User.findByPk(swiper_id);
  if (!swiper) throw new Error('Usuario swiper no existe');

  const swiped = await User.findByPk(swiped_id);
  if (!swiped) throw new Error('Usuario swiped no existe');

  // Evitar swipe a uno mismo
  if (swiper_id === swiped_id) throw new Error('No puedes hacer swipe a ti mismo');

  // Crear el swipe o actualizar si ya existe (opcional)
  // Aquí intento crear, y si existe, puedes decidir si actualizar o lanzar error
  try {
    const newSwipe = await Swipe.create({ swiper_id, swiped_id, is_like });
    return newSwipe;
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Ya hiciste swipe a este usuario');
    }
    throw err;
  }
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
