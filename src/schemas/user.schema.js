const Joi = require('joi');
const base64Regex = /^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/;

const registerUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).required(),
  career: Joi.string().max(100).required(),
  age: Joi.number().integer().min(17).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  photos: Joi.array()
    .items(Joi.string().pattern(base64Regex).required())
    .length(3)
    .required()
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).required()
});

module.exports = { registerUserSchema, loginUserSchema };
