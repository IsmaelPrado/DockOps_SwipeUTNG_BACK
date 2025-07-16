const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Swipe UTNG BACKEND en ejecución!' });
});

app.listen(PORT, () => {
  console.log(`Servidor Swipe UTNG backend escuchando en http://localhost:${PORT}`);
});
