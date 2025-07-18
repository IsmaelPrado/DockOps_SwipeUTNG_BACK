function validateRequestBody(req, res, next) {
  const methodsThatRequireBody = ['POST', 'PUT', 'PATCH'];

  if (methodsThatRequireBody.includes(req.method)) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El cuerpo de la solicitud (body) no puede estar vacío',
        data: null
      });
    }
  }

  next();
}

module.exports = validateRequestBody;
