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

function getBase64SizeInMB(base64String) {
  const base64Data = base64String.split(',')[1]; // quita el encabezado
  const sizeInBytes = (base64Data.length * 3) / 4; // fórmula para base64
  return sizeInBytes / (1024 * 1024); // en MB
}


module.exports = {
  createUser,
  findUserByEmail,
  getBase64SizeInMB
};
