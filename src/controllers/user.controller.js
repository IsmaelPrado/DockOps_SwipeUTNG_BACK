const { User } = require('../models');

const { Op } = require('sequelize');

// Obtener perfil de usuario por token
const getUserProfile = async (req, res) => {
  const userId = req.userId; // Asumiendo que el ID del usuario está
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

const getUsuariosConFiltros = async (req, res) => {
  try {
    const {
      career,
      minAge,
      maxAge,
      gender,
      page = 1,
      limit = 10
    } = req.query;

    const whereClause = {};

    // Solo incluir filtros si tienen valor válido
    if (career && career.trim() !== '') {
      whereClause.career = career.trim();
    }

    if (gender && gender.trim() !== '') {
      whereClause.gender = gender.trim();
    }

    if (minAge || maxAge) {
      whereClause.age = {};
      if (minAge && !isNaN(minAge)) {
        whereClause.age[Op.gte] = parseInt(minAge);
      }
      if (maxAge && !isNaN(maxAge)) {
        whereClause.age[Op.lte] = parseInt(maxAge);
      }

      // Si no se asignó nada útil, eliminamos age del where
      if (Object.keys(whereClause.age).length === 0) {
        delete whereClause.age;
      }
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count: total, rows: users } = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset,
      attributes: ['id', 'name', 'career', 'age', 'gender', 'photos']
    });

    res.status(200).json({
      success: true,
      message: users.length > 0
        ? 'Usuarios encontrados'
        : 'No se encontraron usuarios con los filtros proporcionados',
      data: users,
      pagination: {
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        perPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener usuarios con filtros:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al obtener usuarios',
      data: null
    });
  }
};


module.exports = {
  getUsuarios,
  getUsuariosPorCarrera,
  getUserProfile,
  getUsuariosConFiltros
};
