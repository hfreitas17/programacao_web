



const StatusRequerimento = require('../models/StatusRequerimento');

exports.criarStatus = async (req, res) => {
  try {
    const status = await StatusRequerimento.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarStatus = async (req, res) => {
  try {
    const status = await StatusRequerimento.findAll();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};