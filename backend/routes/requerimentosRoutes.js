/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/

const express = require('express');
const router = express.Router();
const { cadastrarRequerimento, listarRequerimentos, atualizarRequerimento, deletarRequerimento } = require('../controllers/requerimentoController');

router.post('/requerimentos', cadastrarRequerimento);
router.get('/requerimentos', listarRequerimentos);
// Rota para atualizar requerimento
router.put('/requerimentos/:id', atualizarRequerimento);
// Rota para deletar requerimento
router.delete('/requerimentos/:id', deletarRequerimento);

module.exports = router;