// index.js
const express = require('express');
const cors = require('cors');

// Socket.IO y HTTP
const http = require('http');                   
const { Server } = require('socket.io');        
const socketHandler = require('./sockets/socketHandler'); 

// ** Rutas
const authRoutes = require('./routes/auth.routes');
const swipeRoutes = require('./routes/swipe.routes');
const matchRoutes = require('./routes/match.routes');
const userRoutes = require('./routes/users.routes');
const messageRoutes = require('./routes/message.routes');

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

app.use('/api', authRoutes);
app.use('/api', matchRoutes);
app.use('/api', userRoutes);
app.use('/api/swipe', swipeRoutes);
app.use('/api', messageRoutes);

// Ruta de prueba (base)
app.get('/', (req, res) => {
  res.json({ message: 'SwipeUTNG backend funcionando 💘🎓' });
});

// Crear servidor HTTP a partir de Express
const server = http.createServer(app);

// Crear instancia de Socket.IO con configuración CORS
const io = new Server(server, {
  cors: {
    origin: '*',          
    methods: ['GET', 'POST'],
  },
});

// Inicializar el manejador de sockets (socketHandler.js)
socketHandler(io);

(async () => {
  try {
    // Crear base de datos si no existe
    await createDatabase();

    // Sincronizar modelos (puedes cambiar alter:true por force:true si necesitas reset)
    await db.sync({ alter: true });
    logger.info('✅ ¡BASE DE DATOS CONECTADA!');

    // Iniciar servidor
    server.listen(PORT, () => {
      logger.info(`🚀 SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
    });

  } catch (error) {
    logger.error('❌ ERROR AL CONECTAR LA BASE DE DATOS => ', error);
    process.exit(1); // Salir con error si falla la DB
  }
})();