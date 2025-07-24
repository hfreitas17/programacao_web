/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/

/* O Server.js é o ponto de entrada do backend da aplicação. Ele configura e inicializa o servidor Express, define as rotas da API,
* aplica os middlewares necessários (como CORS e JSON), serve os arquivos do frontend e realiza a conexão com o banco de dados usando Sequelize. 
* Além disso, gerencia o roteamento para estudantes, cursos, categorias de requerimento, requerimentos e relatórios, garantindo o funcionamento integrado do sistema 
*/


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
const categoriasRequerimentoRoutes = require('./routes/categoriasRequerimentoRoutes');
const requerimentosRoutes = require('./routes/requerimentosRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

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
app.use('/api', categoriasRequerimentoRoutes);
app.use('/api', requerimentosRoutes);
app.use('/api/relatorios', relatorioRoutes);

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