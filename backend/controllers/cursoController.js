/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/


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

    // Retorna o curso criado e uma mensagem de sucesso
    res.status(201).json({
      mensagem: 'Curso cadastrado com sucesso!',
      curso: novoCurso      
    });

  } catch (error) {
    console.error('Erro ao cadastrar curso:', error);
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
    console.error('Erro ao listar cursos:', error);
    res.status(500).json({ erro: 'Erro interno ao listar cursos.' });
  }
}

// Função para atualizar um curso
async function atualizarCurso(req, res) {
  const { id } = req.params;
  const { nome, nivel, ano_inicio } = req.body;

  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ erro: 'Curso não encontrado.' });
    }

    curso.nome = nome || curso.nome;
    curso.nivel = nivel || curso.nivel;
    curso.ano_inicio = ano_inicio || curso.ano_inicio;

    await curso.save();
    res.status(200).json(curso);
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar curso.' });
  }
}

// Função para deletar um curso
async function deletarCurso(req, res) {
  const { id } = req.params;

  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ erro: 'Curso não encontrado.' });
    }

    await curso.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    res.status(500).json({ erro: 'Erro interno ao deletar curso.' });
  }
}


module.exports = {
  cadastrarCurso,
  listarCursos,
  atualizarCurso,
  deletarCurso
};

