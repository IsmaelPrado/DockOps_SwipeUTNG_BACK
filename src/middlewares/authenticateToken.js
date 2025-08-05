// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];  // Extrae el token

  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.userId = decoded.id;  // Asignar solo el ID del usuario
    next();
  });
};


module.exports = authenticateToken;
