



// controllers/estudanteController.js (ou routes/estudanteController.js)
const { Estudante } = require('../models'); // Usa o modelo diretamente do index.js central

// Função para cadastrar um estudante
async function cadastrarEstudante(req, res) {
  const { nome, matricula, sexo, nascimento, telefone, email, curso_id } = req.body;

  try {
    // Verifica se a matrícula já existe
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
    console.error('❌ Erro ao cadastrar estudante:', error);
    res.status(500).json({
      erro: 'Erro interno no servidor.',
      detalhes: error.message
    });
  }
}

// 📋 Função para listar estudantes
async function listarEstudantes(req, res) {
  try {
    const estudantes = await Estudante.findAll({
      include: {
        association: 'curso', // Garante que venha os dados do curso vinculado
        attributes: ['id', 'nome'] // Pode personalizar os campos desejados
      }
    });

    res.status(200).json(estudantes);
  } catch (error) {
    console.error('❌ Erro ao listar estudantes:', error);
    res.status(500).json({ erro: 'Erro ao listar estudantes.' });
  }
}

module.exports = {
  cadastrarEstudante,
  listarEstudantes
};




/*
const Estudante = require('../models/Estudante');

const pool = require('../database/db');

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
*/