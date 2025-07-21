



//const pool = require('../database/db');
const Estudante = require('../models/Estudante');

const { pool } = require('../database/db'); // Importa o pool de conexões do banco de dados

// Função para cadastrar um estudante
async function cadastrarEstudante(req, res) {
  const { nome, matricula, sexo, nascimento, telefone, email, curso_id } = req.body;

  try {
    // Verifica se matrícula já existe
    const jaExiste = await Estudante.findOne({ where: { matricula } });

    if (jaExiste) {
      return res.status(400).json({ erro: 'Matrícula já cadastrada!' });
    }
    // Cria novo estudante
    const novoEstudante = await Estudante.create({
      nome,
      matricula,
      sexo,
      nascimento,
      telefone,
      email,
      curso_id
    });
    res.status(201).json(novoEstudante);
  } catch (error) {
    console.error('Erro ao cadastrar estudante:', error);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

// Exemplo de função para listar estudantes
async function listarEstudantes(req, res) {
  try {
    const estudantes = await Estudante.findAll();
    res.status(200).json(estudantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar estudantes.' });
  }
}

// Exporta a função para ser usada nas rotas
module.exports = { cadastrarEstudante, listarEstudantes };
