/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/


const express = require('express');
const { cadastrarEstudante, listarEstudantes, atualizarEstudante, deletarEstudante } = require('../controllers/estudanteController');

const router = express.Router();

// Rota para cadastrar um estudante
router.post('/estudantes', cadastrarEstudante);
// Rota para listar todos os estudantes
router.get('/estudantes', listarEstudantes);
// Rota para atualizar estudante
router.put('/estudantes/:id', atualizarEstudante);
// Rota para excluir estudante
router.delete('/estudantes/:id', deletarEstudante);


module.exports = router;