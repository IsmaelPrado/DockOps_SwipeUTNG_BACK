const { db, User } = require('../index')

async function createUser({ name, email, password, career, age, gender }) {
  const newUser = await User.create({ name, email, password, career, age, gender });
  return newUser;
}


async function findUserByEmail(email) {
  const user = await User.findOne({
    where: { email },
    attributes: ['name', 'email', 'password', 'career', 'age', 'gender']
  });
  return user;
}

module.exports = {
  createUser,
  findUserByEmail
};
