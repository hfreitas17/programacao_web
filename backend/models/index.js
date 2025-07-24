/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/



const Sequelize = require('sequelize');
const sequelize = require('../database/db');

// Importação dos modelos
const Curso = require('./Curso')(sequelize, Sequelize.DataTypes);
const Estudante = require('./Estudante')(sequelize, Sequelize.DataTypes);
const CategoriasRequerimento = require('./CategoriasRequerimento')(sequelize, Sequelize.DataTypes);
const Requerimento = require('./Requerimento')(sequelize, Sequelize.DataTypes);


// Associações
Curso.hasMany(Estudante, { foreignKey: 'curso_id', as: 'estudantes' });
Estudante.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });

Requerimento.belongsTo(Estudante, { foreignKey: 'estudante_id', as: 'estudante' });
Requerimento.belongsTo(CategoriasRequerimento, { foreignKey: 'categorias_requerimento_id', as: 'categorias_requerimento' });

Estudante.hasMany(Requerimento, { foreignKey: 'estudante_id', as: 'requerimentos' });
CategoriasRequerimento.hasMany(Requerimento, { foreignKey: 'categorias_requerimento_id', as: 'requerimentos' });


// Exportar tudo
module.exports = {
  sequelize,
  Curso,
  Estudante,
  CategoriasRequerimento,
  Requerimento
};
