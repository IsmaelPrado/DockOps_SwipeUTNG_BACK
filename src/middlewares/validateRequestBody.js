function validateRequestBody(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'El cuerpo de la solicitud (body) no puede estar vacío'
    });
  }
  next();
}

module.exports = validateRequestBody;