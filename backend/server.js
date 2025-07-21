



const sequelize = require('./database/db');

const express = require('express');
const cors = require('cors');           // CORS para permitir requisições de diferentes origens
require('dotenv').config();             // Carrega variáveis de ambiente do arquivo .env

const estudanteRoutes = require('./routes/estudanteRoutes');                      // Importa as rotas de estudante
const cursoRoutes = require('./routes/cursoRoutes');                              // Importa as rotas de curso
const tipoRequerimentoRoutes = require('./routes/tipoRequerimentoRoutes');        // Importa as rotas de tipo de requerimento
const statusRequerimentoRoutes = require('./routes/statusRequerimentoRoutes');    // Importa as rotas de status de requerimento


const app = express();
const porta = 3000;

app.use(cors());                            // Configura CORS para permitir requisições de diferentes origens
app.use(express.json());                    // Configura o Express para interpretar JSON

app.use('/api', estudanteRoutes);           // Define as rotas de estudante
app.use('/api', cursoRoutes);               // Define as rotas de curso
app.use('/api', tipoRequerimentoRoutes);    // Define as rotas de tipo de requerimento
app.use('/api', statusRequerimentoRoutes);  // Define as rotas de status de requerimento



sequelize.sync().then(() => {
  app.listen(porta, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});
