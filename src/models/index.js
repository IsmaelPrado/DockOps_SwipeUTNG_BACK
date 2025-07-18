const db = require('../config/database/database');
const User = require('../models/database_schema/user.model');

const UserTable = User(db, require('sequelize').DataTypes);

module.exports = {
    db,
    UserTable
}