/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/


const express = require('express');
const router = express.Router();
const { cadastrarCurso, listarCursos } = require('../controllers/cursoController');

router.post('/cursos', cadastrarCurso);
router.get('/cursos', listarCursos);

module.exports = router;