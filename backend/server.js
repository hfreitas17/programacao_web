



// Dependências
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Modelos centralizados
const { sequelize } = require('./models');

// Rotas
const estudanteRoutes = require('./routes/estudanteRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const tipoRequerimentoRoutes = require('./routes/tipoRequerimentoRoutes');
const statusRequerimentoRoutes = require('./routes/statusRequerimentoRoutes');

// Instância do Express
const app = express();
const porta = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Servir frontend
const frontendPath = path.resolve(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Rota principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Rotas da API
app.use('/api', estudanteRoutes);
app.use('/api', cursoRoutes);
app.use('/api', tipoRequerimentoRoutes);
app.use('/api', statusRequerimentoRoutes);

// Fallback para rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// Sincronização com banco e inicialização
sequelize.sync().then(() => {
  app.listen(porta, () => {
    console.log(` Servidor rodando em http://localhost:${porta}`);
  });
}).catch((error) => {
  console.error(' Erro ao conectar ao banco de dados:', error);
});



/*
//const sequelize = require('./database/db');
const { sequelize, Curso, Estudante } = require('./models');

const express = require('express');
const app = express( ); // Cria uma instância do Express
const cors = require('cors');           // CORS para permitir requisições de diferentes origens

require('dotenv').config();             // Carrega variáveis de ambiente do arquivo .env

app.use(cors());                            // Configura CORS para permitir requisições de diferentes origens
app.use(express.json());

const estudanteRoutes = require('./routes/estudanteRoutes');                      // Importa as rotas de estudante
const cursoRoutes = require('./routes/cursoRoutes');                              // Importa as rotas de curso
const tipoRequerimentoRoutes = require('./routes/tipoRequerimentoRoutes');        // Importa as rotas de tipo de requerimento
const statusRequerimentoRoutes = require('./routes/statusRequerimentoRoutes');    // Importa as rotas de status de requerimento
const porta = 3000;


const path = require('path'); // Importa o módulo path para manipulação de caminhos de arquivos

// Caminho absoluto até a pasta 'frontend'
//const frontendPath = path.join(__dirname, '../frontend');
const frontendPath = path.resolve(__dirname, '../frontend');

// Servir arquivos estáticos da pasta frontend
app.use(express.static(frontendPath));

// Rota principal para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


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
});*/