const bcrypt = require('bcryptjs');
const { generateToken } = require('../services/jwt.service');
const { createUser, findUserByEmail } = require('../models/user.model');

exports.register = async (req, res) => {
  const { name, email, password, career, age, gender } = req.body;

  if (!name || !email || !password || !career || !age || !gender) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword, career, age, gender });
    res.status(201).json({
      message: 'Usuario registrado',
      user: { id: user.id, name, email, career, age, gender }
    });
  } catch (err) {
    res.status(400).json({ message: 'Error al registrar', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken(user);
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        career: user.career,
        age: user.age,
        gender: user.gender
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al hacer login', error: err.message });
  }
};
