// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth.routes');
const matchRoutes = require('./routes/match.routes');
const userRoutes = require('./routes/users.routes');

app.use('/api', authRoutes);
app.use('/api', matchRoutes);
app.use('/api', userRoutes);

// Ruta de prueba (base)
app.get('/', (req, res) => {
  res.json({ message: 'SwipeUTNG backend funcionando 💘🎓' });
});

// Base de datos y servidor
const { db } = require('./models');
const logger = require('./config/log/logger');
const createDatabase = require('./config/database/createDatabase');

(async () => {
  try {
    // Crear base de datos si no existe
    await createDatabase();

    // Sincronizar modelos (puedes cambiar alter:true por force:true si necesitas reset)
    await db.sync({ alter: true });
    logger.info('✅ ¡BASE DE DATOS CONECTADA!');

    // Iniciar servidor
    app.listen(PORT, () => {
      logger.info(`🚀 SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
    });

  } catch (error) {
    logger.error('❌ ERROR AL CONECTAR LA BASE DE DATOS => ', error);
    process.exit(1); // Salir con error si falla la DB
  }
})();
