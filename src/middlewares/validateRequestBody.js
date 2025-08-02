// middlewares/validateRequestBody.js
const validateRequestBody = (req, res, next) => {
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: 'El cuerpo de la solicitud no puede estar vacío' });
  }
  next();
};

module.exports = validateRequestBody;
