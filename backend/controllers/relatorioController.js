/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/




const { Estudante, Curso, Requerimento, CategoriasRequerimento } = require('../models');

// Função para gerar relatório de estudantes por curso
async function estudantesPorCurso(req, res) {
  try {
    const cursos = await Curso.findAll({
      include: [{ model: Estudante, as: 'estudantes' }]
    });
    const resultado = cursos.map(curso => ({
      curso: curso.nome,
      quantidade: curso.estudantes.length,
      estudantes: curso.estudantes
    }));
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar relatório.' });
  }
}

// Função para gerar relatório de requerimentos por estado
async function requerimentosPorEstado(req, res) {
  try {
    const estados = await Requerimento.findAll({
      attributes: ['estado', [sequelize.fn('COUNT', sequelize.col('estado')), 'quantidade']],
      group: ['estado']
    });
    res.json(estados);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar relatório.' });
  }
}


// Função para gerar relatório de requerimentos por coordenação
async function requerimentosPorCoordenacao(req, res) {
  try {
    const resultado = await Requerimento.findAll({
      include: [{ model: CategoriasRequerimento, as: 'categoria', attributes: ['instancia_responsavel'] }],
      attributes: [
        [sequelize.col('categoria.instancia_responsavel'), 'coordenacao'],
        [sequelize.fn('COUNT', sequelize.col('Requerimento.id')), 'quantidade']
      ],
      group: ['categoria.instancia_responsavel']
    });
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao gerar relatório.' });
  }
}

module.exports = {
  estudantesPorCurso,
  requerimentosPorEstado,
  requerimentosPorCoordenacao
};