const Joi = require('joi');

const createMessageSchema = Joi.object({
  match_id: Joi.number().integer().required(),
  sender_id: Joi.number().integer().required(),
  text: Joi.string().min(1).max(500).required(),
});

module.exports = { createMessageSchema };
