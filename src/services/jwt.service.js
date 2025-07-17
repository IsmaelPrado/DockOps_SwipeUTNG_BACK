const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      career: user.career,
      age: user.age,
      gender: user.gender
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}

module.exports = { generateToken };
