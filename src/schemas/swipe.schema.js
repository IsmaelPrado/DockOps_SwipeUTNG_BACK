const Joi = require('joi');

const createSwipeSchema = Joi.object({
  swiper_id: Joi.number().integer().positive().required()
    .messages({
      'number.base': `"swiper_id" debe ser un número`,
      'number.integer': `"swiper_id" debe ser un entero`,
      'number.positive': `"swiper_id" debe ser positivo`,
      'any.required': `"swiper_id" es requerido`
    }),
  swiped_id: Joi.number().integer().positive().required()
    .messages({
      'number.base': `"swiped_id" debe ser un número`,
      'number.integer': `"swiped_id" debe ser un entero`,
      'number.positive': `"swiped_id" debe ser positivo`,
      'any.required': `"swiped_id" es requerido`
    }),
  is_like: Joi.boolean().required()
    .messages({
      'boolean.base': `"is_like" debe ser verdadero o falso`,
      'any.required': `"is_like" es requerido`
    })
});

module.exports = { createSwipeSchema };
