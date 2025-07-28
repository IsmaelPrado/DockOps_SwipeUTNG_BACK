    const bcrypt = require('bcryptjs');
    const { generateToken } = require('../services/jwt.service');
    const { createUser, findUserByEmail } = require('../models/users/user.model');
    const { registerUserSchema, loginUserSchema } = require('../schemas/user.schema');

    const apiResponse  = require('../utils/response')

    // REGISTRO DE USUARIO
    async function register (req, res)  {
      const { error } = registerUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json(apiResponse({
          success: false,
          message: `Datos inválidos: ${error.details[0].message}`
        }));
      }

      const { name, email, password, career, age, gender } = req.body;

      try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
          return res.status(400).json(apiResponse({
            success: false,
            message: 'El correo ya está registrado'
          }));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ name, email, password: hashedPassword, career, age, gender });

        return res.status(201).json(apiResponse({
          success: true,
          message: 'Usuario registrado con éxito',
          data: {
            id: user.id,
            name,
            email,
            career,
            age,
            gender
          }
        }));
      } catch (err) {
        return res.status(500).json(apiResponse({
          success: false,
          message: 'Error al registrar usuario',
          data: err.message
        }));
      }
    };

    // LOGIN DE USUARIO
    async function login (req, res) {
      const { error } = loginUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json(apiResponse({
          success: false,
          message: 'Datos inválidos',
          data: error.details[0].message
        }));
      }

      const { email, password } = req.body;

      try {
        const user = await findUserByEmail(email);
        if (!user) {
          return res.status(404).json(apiResponse({
            success: false,
            message: 'Usuario no encontrado'
          }));
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return res.status(401).json(apiResponse({
            success: false,
            message: 'Contraseña incorrecta'
          }));
        }

        const token = generateToken(user);
        return res.status(200).json(apiResponse({
          success: true,
          message: 'Login exitoso',
          data: {
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              career: user.career,
              age: user.age,
              gender: user.gender
            }
          }
        }));
      } catch (err) {
        return res.status(500).json(apiResponse({
          success: false,
          message: 'Error al hacer login',
          data: err.message
        }));
      }
    };


    // EXPORTACIONES
    module.exports = {
      //REGISTRO DE USUARIOS
      register,

      //LOGIN
      login
    }