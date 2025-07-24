/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/


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

    // Retorna o estudante criado e uma mensagem de sucesso
    res.status(201).json({
      mensagem: 'Estudante cadastrado com sucesso!',
      estudante: novoEstudante
    });    
    
  } catch (error) {
    console.error('Erro ao cadastrar estudante:', error);
    res.status(500).json({
      erro: 'Erro interno no servidor.',
      detalhes: error.message
    });
  }
}

// Função para listar estudantes
async function listarEstudantes(req, res) {
  const { matricula } = req.query;
  const { curso_id } = req.query;

  try {
    let estudantes;
    // Busca todos os estudantes ou filtra por matrícula se fornecida
    if (matricula) {
      estudantes = await Estudante.findAll({ where: { matricula } });
    } else {
      estudantes = await Estudante.findAll();
    }
    // Filtra por curso_id se fornecido
    if (curso_id) {
      estudantes = await Estudante.findAll({ where: { curso_id } });
      //estudantes = estudantes.filter(estudante => estudante.curso_id === curso_id);
    }
    if (estudantes.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum estudante encontrado.' });
    }
    // Retorna a lista de estudantes
    res.json(estudantes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar estudantes.' });
  }
}

// Função para atualizar um estudante
async function atualizarEstudante(req, res) {
  const { id } = req.params;
  const { nome, matricula, sexo, nascimento, telefone, email, curso_id } = req.body;

  console.log(`ID: ${id}, Nome: ${nome}, Matrícula: ${matricula}, Sexo: ${sexo}, Nascimento: ${nascimento}, Telefone: ${telefone}, Email: ${email}, Curso ID: ${curso_id}`);

  try {
    const estudante = await Estudante.findByPk(id);
    if (!estudante) {
      return res.status(404).json({ erro: 'Estudante não encontrado.' });
    }
    if (nascimento && nascimento !== 'Invalid date') {
      estudante.nascimento = nascimento;
    }
    // Atualiza os campos do estudante
    estudante.nome = nome || estudante.nome;
    estudante.matricula = matricula || estudante.matricula;
    estudante.sexo = sexo || estudante.sexo;
    estudante.nascimento = nascimento || estudante.nascimento;
    estudante.telefone = telefone || estudante.telefone;
    estudante.email = email || estudante.email;
    estudante.curso_id = curso_id || estudante.curso_id;

    await estudante.save();
    res.status(200).json({
      mensagem: 'Estudante atualizado com sucesso!',
      estudante
  });
  } catch (error) {
    console.error('Erro ao atualizar estudante:', error);
    res.status(500).json({ erro: 'Erro ao atualizar estudante.' });
  }
}

// Função para deletar um estudante
async function deletarEstudante(req, res) {
  const { id } = req.params;

  try {
    const estudante = await Estudante.findByPk(id);
    if (!estudante) {
      return res.status(404).json({ erro: 'Estudante não encontrado.' });
    }

    await estudante.destroy();
    res.status(204).json({
      mensagem: 'Estudante excluído com sucesso!',
      estudante
    });
  } catch (error) {
    console.error('Erro ao deletar estudante:', error);
    res.status(500).json({ erro: 'Erro ao deletar estudante. O mesmo pode estar associado a outros registros.' });
  }
}

module.exports = {
  cadastrarEstudante,
  listarEstudantes,
  atualizarEstudante,
  deletarEstudante
};
