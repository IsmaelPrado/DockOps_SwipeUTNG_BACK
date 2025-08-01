// middlewares/validateRequestBody.js
function validateRequestBody(req, res, next) {
  // Permitir métodos que no necesitan body
  if (['GET', 'DELETE'].includes(req.method)) {
    return next();
  }

  // Solo validar si es POST, PUT, PATCH, etc.
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'El cuerpo de la solicitud (body) no puede estar vacío'
    });
  }

  next();
}

module.exports = validateRequestBody;