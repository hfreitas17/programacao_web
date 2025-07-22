



const { Curso, Estudante } = require('../models');

// Cadastrar novo curso
async function cadastrarCurso(req, res) {
  const { nome, nivel, ano_inicio } = req.body;

  try {
    const cursoExistente = await Curso.findOne({ where: { nome } });

    if (cursoExistente) {
      return res.status(400).json({ erro: 'Curso já cadastrado!' });
    }

    const novoCurso = await Curso.create({ nome, nivel, ano_inicio });
    res.status(201).json(novoCurso);
  } catch (error) {
    console.error('❌ Erro ao cadastrar curso:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar curso.', detalhes: error.message });
  }
}

// Listar cursos com seus estudantes
async function listarCursos(req, res) {
  try {
    const cursos = await Curso.findAll({
      include: {
        model: Estudante,
        as: 'estudantes',
        attributes: ['id', 'nome', 'matricula'] // personaliza os campos retornados
      }
    });

    res.status(200).json(cursos);
  } catch (error) {
    console.error('❌ Erro ao listar cursos:', error);
    res.status(500).json({ erro: 'Erro interno ao listar cursos.' });
  }
}

module.exports = {
  cadastrarCurso,
  listarCursos
};

/*
const Curso = require('../models/Curso');
const Estudante = require('../models/Estudante'); // Para incluir estudantes

async function cadastrarCurso(req, res) {
  const { nome, nivel, ano_inicio } = req.body;

  try {
    // Verifica se já existe curso com mesmo nome
    const cursoExistente = await Curso.findOne({ where: { nome } });

    if (cursoExistente) {
      return res.status(400).json({ erro: 'Curso já cadastrado!' });
    }
    const novoCurso = await Curso.create({
      nome,
      nivel,
      ano_inicio
    });

    res.status(201).json(novoCurso);
  } catch (error) {
    console.error('Erro ao cadastrar curso:', error);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

// Função para listar cursos
async function listarCursos(req, res) {
  try {
    const cursos = await Curso.findAll({
      include: {
        model: Estudante,
        as: 'estudantes'
      }
    });

    res.status(200).json(cursos);
  } catch (error) {
    console.error('Erro ao listar cursos:', error);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

module.exports = {
  cadastrarCurso,
  listarCursos
};

*/
/*const Curso = require('../models/Curso');

async function cadastrarCurso(req, res) {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

async function listarCursos(req, res) {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar cursos.' });
  }
}

module.exports = { cadastrarCurso, listarCursos };*/