/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/


const { Requerimento, Estudante, Curso, CategoriasRequerimento } = require('../models');

// Função para cadastrar um novo requerimento
async function cadastrarRequerimento(req, res) {
  const { data_solicitacao, observacoes, estado, estudante_id, categorias_requerimento_id } = req.body;

  try {
    const novoRequerimento = await Requerimento.create({
      data_solicitacao,
      observacoes,
      estado,
      estudante_id,
      categorias_requerimento_id
    });

    // Retorna o estudante criado e uma mensagem de sucesso
    res.status(201).json({
      mensagem: 'Requerimento cadastrado com sucesso!',
      requerimento: novoRequerimento
    });

  } catch (error) {
    console.error('Erro ao cadastrar requerimento:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar requerimento' });
  }
}

// Função para listar requerimentos com filtros opcionais
async function listarRequerimentos(req, res) {
  try {
    const { curso_id, instancia_responsavel, id } = req.query;

    const where = {};
    if (id) {
      where.id = id;
    }

    const requerimentos = await Requerimento.findAll({
      where,
      include: [
        {
          model: Estudante,
          as: 'estudante',
          attributes: ['nome', 'matricula'],
          include: [
            {
              model: Curso,
              as: 'curso',
              attributes: ['nome'],
              // Filtro por curso_id
              where: curso_id ? { id: curso_id } : undefined
            }
          ]
        },
        {
          model: CategoriasRequerimento,
          as: 'categorias_requerimento',
          attributes: ['nome', 'instancia_responsavel'],
          // Filtro por instancia_responsavel
          where: instancia_responsavel ? { instancia_responsavel } : undefined
        }
      ]
    });

    return res.status(200).json(requerimentos);
  } catch (error) {
    console.error('Erro ao listar requerimentos:', error);
    return res.status(500).json({ error: 'Erro ao listar requerimentos' });
  }
}

// Função para atualizar o estado de um requerimento
async function atualizarRequerimento(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const requerimento = await Requerimento.findByPk(id);
    if (!requerimento) {
      return res.status(404).json({ error: 'Requerimento não encontrado' });
    }

    requerimento.estado = estado;
    await requerimento.save();

    return res.status(200).json(requerimento);
  } catch (error) {
    console.error('Erro ao atualizar estado do requerimento:', error);
    return res.status(500).json({ error: 'Erro ao atualizar estado do requerimento' });
  }
}

// Função para deletar um requerimento
async function deletarRequerimento(req, res) {
  const { id } = req.params;

  try {
    const requerimento = await Requerimento.findByPk(id);
    if (!requerimento) {
      return res.status(404).json({ error: 'Requerimento não encontrado' });
    }

    await requerimento.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar requerimento:', error);
    return res.status(500).json({ error: 'Erro ao deletar requerimento, O mesmo pode estar associado a outros registros.' });
  }
}

module.exports = {
  cadastrarRequerimento,
  listarRequerimentos,
  atualizarRequerimento,
  deletarRequerimento
};