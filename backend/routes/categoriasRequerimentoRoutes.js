/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/

/*
* Os routes (rotas) são responsáveis por definir os caminhos (endpoints) da API e e associar cada caminho
* a uma função do controller correspondente. Recebem as requisições HTTP do frontend ou de outros clientes e 
* direcionam para o controller correto, que executa a lógica de negócio.
*/

const express = require('express');
const router = express.Router();
const { cadastrarCategoriasRequerimento, listarCategoriasRequerimento } = require('../controllers/categoriasRequerimentoController');

router.post('/categorias-requerimento', cadastrarCategoriasRequerimento);
router.get('/categorias-requerimento', listarCategoriasRequerimento);

module.exports = router;