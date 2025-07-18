const db = require('../config/db');

async function createUser({ name, email, password, career, age, gender }) {
  const result = await db.query(
    `INSERT INTO users (name, email, password, career, age, gender)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, email, password, career, age, gender]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail
};
