/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/


const express = require('express');
const { estudantesPorCurso, requerimentosPorEstado, requerimentosPorCoordenacao } = require('../controllers/relatorioController');

const router = express.Router();
// Rota para gerar relatório de estudantes por curso
router.get('/estudantes-por-curso', estudantesPorCurso);
// Rota para gerar relatório de requerimentos por estado
router.get('/requerimentos-por-estado', requerimentosPorEstado);
// Rota para gerar relatório de requerimentos por coordenação
router.get('/requerimentos-por-coordenacao', requerimentosPorCoordenacao);

module.exports = router;