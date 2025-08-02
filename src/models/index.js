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

module.exports = {
  db,
  User,
  Match,
};
