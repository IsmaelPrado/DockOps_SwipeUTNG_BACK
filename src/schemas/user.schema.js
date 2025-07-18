const Joi = require('joi');

const registerUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).required(),
  career: Joi.string().max(100).required(),
  age: Joi.number().integer().min(0).required(),
  gender: Joi.string().valid('male', 'female', 'other').required()
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).required()
});


module.exports = { registerUserSchema, loginUserSchema };
