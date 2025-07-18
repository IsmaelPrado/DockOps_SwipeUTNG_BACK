const { Client } = require('pg');
const logger = require('../log/logger');

async function createDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // base default para conectar
    port: 5432,
  });

  await client.connect();

  try {
    await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    logger.info(`Base de datos ${process.env.DB_NAME} creada.`);
  } catch (err) {
    if (err.code === '42P04') {
    logger.warn('La base de datos ya existe. Continuando proceso...');
    } else {
      throw err;
    }
  } finally {
    await client.end();
  }
}

module.exports = createDatabase;
