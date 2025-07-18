require('dotenv').config();
const { Sequelize } = require('sequelize');

// --- CONFIG PARA BASE DE DATOS POSTGRESS
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            logging: false
        })

MediaSourceHandle.exports = sequelize