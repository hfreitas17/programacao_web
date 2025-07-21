



const express = require('express');
const router = express.Router();
const { cadastrarCurso, listarCursos } = require('../controllers/cursoController');

router.post('/cursos', cadastrarCurso);
router.get('/cursos', listarCursos);

module.exports = router;