const { createSwipe, getSwipesByUser } = require('../models/swipes/swipe.model');
const { createSwipeSchema } = require('../schemas/swipe.schema');
const apiResponse = require('../utils/response');
const { User } = require('../models/index');

// Crear swipe usando método del modelo
async function createSwipeController(req, res) {
  const { error } = createSwipeSchema.validate(req.body);
  if (error) {
    return res.status(400).json(apiResponse({
      success: false,
      message: `Datos inválidos: ${error.details[0].message}`,
      data: null
    }));
  }

  const { swiper_id, swiped_id, is_like } = req.body;

  try {
    const { swipe, match } = await createSwipe({ swiper_id, swiped_id, is_like });

    return res.status(201).json(apiResponse({
      success: true,
      message: match ? '¡Swipe y match creado!' : 'Swipe creado correctamente',
      data: { swipe, match }
    }));

  } catch (err) {
    console.error('Error en createSwipeController:', err);

    // Captura errores personalizados lanzados en createSwipe
    const errorMessage = err.message;

    if (
      errorMessage === `Usuario con id ${swiper_id} no existe` ||
      errorMessage === `Usuario con id ${swiped_id} no existe`
    ) {
      return res.status(404).json(apiResponse({
        success: false,
        message: errorMessage,
        data: null
      }));
    }

    if (errorMessage === 'No puedes hacer swipe a ti mismo') {
      return res.status(400).json(apiResponse({
        success: false,
        message: errorMessage,
        data: null
      }));
    }

    if (errorMessage === 'Ya hiciste swipe a este usuario') {
      return res.status(409).json(apiResponse({
        success: false,
        message: errorMessage,
        data: null
      }));
    }

    // Otros errores inesperados
    return res.status(500).json(apiResponse({
      success: false,
      message: 'Error interno del servidor',
      data: null
    }));
  }
}


// Obtener swipes hechos por usuario usando método del modelo
async function getSwipesByUserController(req, res) {
  const { userId } = req.params;

  try {
    // Validar que el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json(apiResponse({
        success: false,
        message: 'Usuario no encontrado',
        data: null
      }));
    }

    // Usar el método del modelo
    const swipes = await getSwipesByUser(userId);

    return res.status(200).json(apiResponse({
      success: true,
      message: 'Swipes obtenidos correctamente',
      data: swipes
    }));

  } catch (err) {
    console.error(err);
    return res.status(500).json(apiResponse({
      success: false,
      message: 'Error interno del servidor',
      data: null
    }));
  }
}

module.exports = {
  createSwipeController,
  getSwipesByUserController
};
