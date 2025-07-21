



const sequelize = require('./database/db');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const estudanteRoutes = require('./routes/estudanteRoutes');
const tipoRequerimentoRoutes = require('./routes/tipoRequerimentoRoutes');
const statusRequerimentoRoutes = require('./routes/statusRequerimentoRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', estudanteRoutes);
app.use('/api', tipoRequerimentoRoutes);
app.use('/api', statusRequerimentoRoutes);


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});
