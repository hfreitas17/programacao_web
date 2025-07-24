/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/

/*
* Os controllers são responsáveis por gerenciar as requisições HTTP, processar os dados recebidos, 
* interagir com os modelos e retornar as respostas adequadas.
* cada controller gerencia as ações relacionadas a uma entidade específica, como estudantes, cursos, 
* categorias de requerimento e requerimentos.
*/


const { CategoriasRequerimento } = require('../models');

// Função para cadastrar um Categorias de requerimento
async function cadastrarCategoriasRequerimento(req, res) {
  const { nome, instancia_responsavel } = req.body;

  try {
    const novaCategorias = await CategoriasRequerimento.create({
      nome,
      instancia_responsavel
    });
    // Retorna a categoria criada e uma mensagem de sucesso
    res.status(201).json({
      mensagem: 'Categoria cadastrada com sucesso!',
      categoria: novaCategorias
    });
    
  } catch (error) {
    res.status(400).json({ erro: 'Categorias já cadastradas!' });
  }
}

// Função para listar todos os Categoriass de requerimento
async function listarCategoriasRequerimento(req, res) {
  try {
    const Categoriass = await CategoriasRequerimento.findAll();
    res.status(200).json(Categoriass);
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno ao cadastrar curso.', detalhes: error.message });
  }
}

// Função para atualizar um Categorias de requerimento
async function atualizarCategoriasRequerimento(req, res) {
  const { id } = req.params;
  const { nome, instancia_responsavel } = req.body;

  try {
    const Categorias = await CategoriasRequerimento.findByPk(id);
    if (!Categorias) {
      return res.status(404).json({ erro: 'Categorias de requerimento não encontrado.' });
    }

    Categorias.nome = nome || Categorias.nome;
    Categorias.instancia_responsavel = instancia_responsavel || Categorias.instancia_responsavel;

    await Categorias.save();
    res.status(200).json(Categorias);
  } catch (error) {
    console.error('Erro ao atualizar Categorias de requerimento:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar Categorias de requerimento.' });
  }
}

// Função para deletar um Categorias de requerimento
async function deletarCategoriasRequerimento(req, res) {
  const { id } = req.params;

  try {
    const Categorias = await CategoriasRequerimento.findByPk(id);
    if (!Categorias) {
      return res.status(404).json({ erro: 'Categorias de requerimento não encontrado.' });
    }

    await Categorias.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Categorias de requerimento:', error);
    res.status(500).json({ erro: 'Erro interno ao deletar Categorias de requerimento.' });
  }
}

module.exports = {
  cadastrarCategoriasRequerimento,
  listarCategoriasRequerimento,
  atualizarCategoriasRequerimento,
  deletarCategoriasRequerimento
};