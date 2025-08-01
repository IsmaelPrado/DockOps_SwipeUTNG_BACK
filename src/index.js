// index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Rutas
const authRoutes = require('./routes/auth.routes');
const matchRoutes = require('./routes/match.routes'); // 🔥 Importante

// Módulos personalizados
const { db } = require('./models/index');
const logger = require('./config/log/logger');
const createDatabase = require('./config/database/createDatabase');
const validateRequestBody = require('./middlewares/validateRequestBody');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(validateRequestBody); // Ahora es seguro gracias a la corrección

// Rutas API
app.use('/api', authRoutes);
app.use('/api', matchRoutes); // 🔥 Asegúrate de que esta línea exista

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'SwipeUTNG backend funcionando 💘🎓' });
});

// Servidor y conexión a BD
(async () => {
  try {
    await createDatabase();
    await db.sync({ alter: true });
    logger.info('¡BASE DE DATOS CONECTADA!');

    app.listen(PORT, () => {
      logger.info(`SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('ERROR AL CONECTAR LA BASE DE DATOS => ', error);
  }
})();

module.exports = app;