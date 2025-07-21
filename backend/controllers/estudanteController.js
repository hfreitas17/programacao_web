



//const pool = require('../database/db');
const Estudante = require('../models/Estudante');


async function cadastrarEstudante(req, res) {
  const { nome, matricula, sexo, nascimento, telefone, email, curso_id } = req.body;

  try {
    // Verifica se matrícula já existe
    const jaExiste = await pool.query('SELECT * FROM estudante WHERE matricula = $1', [matricula]);
    if (jaExiste.rows.length > 0) {
      return res.status(400).json({ erro: 'Matrícula já cadastrada!' });
    }

    const resultado = await pool.query(
      'INSERT INTO estudante (nome, matricula, sexo, nascimento, telefone, email, curso_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome, matricula, sexo, nascimento, telefone, email, curso_id]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao cadastrar estudante.' });
  }
}

module.exports = { cadastrarEstudante };
