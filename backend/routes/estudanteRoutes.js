



const express = require('express');
const { cadastrarEstudante, listarEstudantes } = require('../controllers/estudanteController');

const router = express.Router();

router.post('/estudantes', cadastrarEstudante); // Rota para cadastrar um estudante

router.get('/estudantes', listarEstudantes); // Rota para listar todos os estudantes

module.exports = router;