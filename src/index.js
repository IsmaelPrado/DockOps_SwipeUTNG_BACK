// ** Variables de entorno
require('dotenv').config();

// ** Paquetes npm instalados
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

// ** Módulos
const db = require('./models');
const logger = require('./config/log/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SwipeUTNG backend funcionando 💘🎓' });
});

// --- CONFIGURACIÓN DEL SERVIDOR

(async () => {
  try {
    // --- CREACIÓN DE BASE DE DATOS Y TABLAS DINÁMICAMENTE
    await db.sequelize.sync({ alter: true });
    logger.info('¡BASE DE DATOS CONECTADA!');

    app.listen(PORT, () => {
      logger.info('SERVIDOR CORRIENDO EN ', process.env.DB_HOST,':',process.env.PORT);
    });
  } catch (error) {
    logger.error('ERROR AL CONECTAR LA BASE DE DATOS => ', error);
  }
 
})

