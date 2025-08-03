
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getBase64SizeInMB = require('../models/users/user.model').getBase64SizeInMB;
const { registerUserSchema } = require('../schemas/user.schema');

// Para validar tamaño de las imágenes
const MAX_IMAGE_MB = 2;

const register = async (req, res) => {
  const { error } = registerUserSchema.validate(req.body);
   if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: messages, // Enviar todos los errores encontrados
    });
  }
  const { name, email, password, career, age, gender, photos } = req.body;

  try {
    // Validar tamaño de las fotos
    for (const photo of photos) {
      const sizeInMB = getBase64SizeInMB(photo);
      if (sizeInMB > MAX_IMAGE_MB) {
        return res.status(400).json({ message: `Cada foto debe ser menor a ${MAX_IMAGE_MB} MB` });
      }
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: ['Ya existe un usuario con este correo electrónico']
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      career,
      age,
      gender,
      photos: photos || [] 
    });

    console.log('Usuario creado:', user);

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no está definido');
      return res.status(500).json({ message: 'Error de configuración del servidor' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        career: user.career,
        age: user.age,
        gender: user.gender,
        photos: user.photos,
      },
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no está definido');
      return res.status(500).json({ message: 'Error de configuración del servidor' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Usuario no encontrado con email:', email);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', user);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Contraseña incorrecta para usuario:', email);
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        career: user.career,
        age: user.age,
        gender: user.gender,
        photos: user.photos,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      career: user.career,
      age: user.age,
      gender: user.gender,
      photos: user.photos,
    });
  } catch (error) {
    console.error('Error en getMe:', error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};



module.exports = { register, login, getMe };

