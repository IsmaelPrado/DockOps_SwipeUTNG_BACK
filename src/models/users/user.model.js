const { db, UserTable } = require('../index')

async function createUser({ name, email, password, career, age, gender }) {
  const newUser = await UserTable.create({ name, email, password, career, age, gender });
  return newUser;
}


async function findUserByEmail(email) {
  const user = await UserTable.findOne({
    where: { email },
    attributes: ['name', 'email', 'password', 'career', 'age', 'gender']
  });
  return user;
}

module.exports = {
  createUser,
  findUserByEmail
};
