const request = require('supertest');
const app = require('../index');
const {db, UserTable} = require('../models/index');

describe('User Endpoints', () => {
  const testEmail = 'duplicate@example.com';
  const createdEmails = [testEmail]; // para trackear usuarios creados y eliminarlos luego

  beforeAll(async () => {
    // Crear usuario de prueba solo 1 vez antes de todos los tests
    await UserTable.create({
      name: 'Test User',
      email: testEmail,
      password: '123456', 
      career: 'Computer Science',
      age: 20,
      gender: 'male'
    });
  });

  afterAll(async () => {
    // Limpiar la base de datos: borrar todos los usuarios creados en estos tests
    await UserTable.destroy({
      where: {
        email: createdEmails
      }
    });

    // Cierra conexión si es necesario
    await db.close();
  });

  it('Debería crear un nuevo usuario', async () => {
    const newEmail = `unique${Date.now()}@example.com`;
    createdEmails.push(newEmail);

    const res = await request(app)
      .post('/api/register')
      .send({
        name: 'Another User',
        email: newEmail,
        password: '123456',
        career: 'Computer Science',
        age: 21,
        gender: 'female'
      });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body.success).toBe(true);
  });

  it('No debería permitir registrar un email duplicado', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        name: 'Duplicate User',
        email: testEmail,
        password: '123456',
        career: 'Computer Science',
        age: 22,
        gender: 'male'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/correo/i);
  });
});
