



const TipoRequerimento = require('../models/TipoRequerimento');

exports.criarTipo = async (req, res) => {
  try {
    const tipo = await TipoRequerimento.create(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarTipos = async (req, res) => {
  try {
    const tipos = await TipoRequerimento.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};