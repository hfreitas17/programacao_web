




const express = require('express');
const router = express.Router();
const { cadastrarEstudante } = require('../controllers/estudanteController');

router.post('/estudantes', cadastrarEstudante);

module.exports = router;
