const Sequelize = require('sequelize');
const db = require('../config/database/database');

// Importamos definiciones de modelos (las funciones, no instancias)
const UserModel = require('../models/database_schema/user.model');
const SwipeModel = require('../models/database_schema/swipes.model');

// Inicializamos modelos con la conexión `db`
const User = UserModel(db, Sequelize.DataTypes);
const Swipe = SwipeModel(db, Sequelize.DataTypes);

// Asociaciones (IMPORTANTE PARA FK)
if (User.associate) User.associate({ User, Swipe });
if (Swipe.associate) Swipe.associate({ User, Swipe });

// Exportamos modelos y conexión
module.exports = {
  db,
  User,
  Swipe
};
