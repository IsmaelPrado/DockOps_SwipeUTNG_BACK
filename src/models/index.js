// models/index.js
const db = require('../config/database/database');
const Sequelize = require('sequelize');
const UserModel = require('./database_schema/user.model');
const MatchModel = require('./database_schema/match.model');

const User = UserModel(db, Sequelize.DataTypes);
const Match = MatchModel(db, Sequelize.DataTypes);

// Asociaciones
if (Match.associate) {
  Match.associate({ User });
}


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
  Match,
  Swipe
};
