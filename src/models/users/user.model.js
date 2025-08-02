const { db, User } = require('../index')

async function createUser({ name, email, password, career, age, gender, photos }) {
  const newUser = await UserTable.create({ name, email, password, career, age, gender, photos });
  return newUser;
}



async function findUserByEmail(email) {
  const user = await User.findOne({
    where: { email },
    attributes: ['name', 'email', 'password', 'career', 'age', 'gender', 'photos']
  });
  return user;
}

module.exports = {
  createUser,
  findUserByEmail
};
