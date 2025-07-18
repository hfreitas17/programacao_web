



const express = require('express');
const cors = require('cors');
require('dotenv').config();

const estudanteRoutes = require('./routes/estudanteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', estudanteRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
