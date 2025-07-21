



const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipoRequerimentoController');

router.post('/tipos-requerimento', controller.criarTipo);
router.get('/tipos-requerimento', controller.listarTipos);

module.exports = router;