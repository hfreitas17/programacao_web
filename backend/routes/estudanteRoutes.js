



const express = require('express');
const { cadastrarEstudante } = require('../controllers/estudanteController');

const router = express.Router();

router.post('/estudantes', cadastrarEstudante);
router.get('/estudantes', (req, res) => {
  res.send('Listar todos os estudantes');
});

module.exports = router;