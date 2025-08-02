// index.js
const express = require('express');
const cors = require('cors');


// ** Rutas
const authRoutes = require('./routes/auth.routes');
const swipeRoutes = require('./routes/swipe.routes');

// ** Módulos
const { db } = require('./models/index');
const logger = require('./config/log/logger');
const createDatabase = require('./config/database/createDatabase');
const validateRequestBody = require('./middlewares/validateRequestBody')

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());

// Aumentar límite de tamaño para JSON y URL encoded
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rutas
const authRoutes = require('./routes/auth.routes');
const matchRoutes = require('./routes/match.routes');
const userRoutes = require('./routes/users.routes');

app.use('/api', authRoutes);
app.use('/api', matchRoutes);
app.use('/api', userRoutes);

app.use('/api/swipe', swipeRoutes);

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







