



const express = require('express');
const router = express.Router();
const { cadastrarCurso, listarCursos } = require('../controllers/cursoController');

router.post('/cursos', cadastrarCurso);
router.get('/cursos', listarCursos);

module.exports = router;


/*const express = require('express');
const { cadastrarCurso, listarCursos } = require('../controllers/cursoController');

const router = express.Router();

router.post('/cursos', cadastrarCurso);      // Rota para cadastrar curso
router.get('/cursos', listarCursos);         // Rota para listar cursos

module.exports = router;*/