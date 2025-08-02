// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];  // Obtén el token de la cabecera Authorization

  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;  // Asigna el usuario al objeto req
    next();
  });
};

module.exports = authenticateToken;
