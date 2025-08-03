const { User } = require('../models');

// Obtener perfil de usuario por token
const getUserProfile = async (req, res) => {
  const userId = req.user.id; // Asumiendo que el ID del usuario está
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'career', 'age', 'gender', 'photos'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    res.status(500).json({ message: 'Error al obtener perfil de usuario' });
  }
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Obtener usuarios por carrera
const getUsuariosPorCarrera = async (req, res) => {
  const { carrera } = req.params;
  console.log(`Buscando usuarios para la carrera: ${carrera}`);

  try {
    const usuarios = await User.findAll({
      where: { career: carrera },
    });

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios para esta carrera' });
    }

    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios por carrera:', error);
    res.status(500).json({ message: 'Error al obtener usuarios por carrera' });
  }
};

module.exports = {
  getUsuarios,
  getUsuariosPorCarrera,
  getUserProfile
};
