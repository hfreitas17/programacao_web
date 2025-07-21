



const express = require('express');
const router = express.Router();
const controller = require('../controllers/statusRequerimentoController');

router.post('/status-requerimento', controller.criarStatus);
router.get('/status-requerimento', controller.listarStatus);

module.exports = router;