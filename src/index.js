// ** Variables de entorno
require('dotenv').config();

// ** Paquetes npm instalados
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ** Rutas
const authRoutes = require('./routes/auth.routes');
const swipeRoutes = require('./routes/swipe.routes');

// ** Módulos
const { db } = require('./models/index');
const logger = require('./config/log/logger');
const createDatabase = require('./config/database/createDatabase');
const validateRequestBody = require('./middlewares/validateRequestBody')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//VALIDACIÓN DE BODY PARA TODAS LAS PETICIONES POST/PUT/PATCH
app.use(validateRequestBody);

app.use('/api', authRoutes);
app.use('/api/swipe', swipeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SwipeUTNG backend funcionando 💘🎓' });
});

// --- CONFIGURACIÓN DEL SERVIDOR

(async () => {
  try {
    // --- CREACIÓN DE BASE DE DATOS Y TABLAS DINÁMICAMENTE
    await createDatabase();

    await db.sync({ alter: true });
    logger.info('¡BASE DE DATOS CONECTADA!');

    app.listen(PORT, () => {
      logger.info(`SERVIDOR CORRIENDO EN ${process.env.DB_HOST}:${PORT}`);
    });
  } catch (error) {
    logger.error('ERROR AL CONECTAR LA BASE DE DATOS => ', error);
  }
 
})();

module.exports = app; // PARA PRUEBAS UNITARIAS
