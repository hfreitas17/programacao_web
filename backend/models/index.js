



const Sequelize = require('sequelize');
const sequelize = require('../database/db');

// Importação dos modelos
const Curso = require('./Curso')(sequelize, Sequelize.DataTypes);
const Estudante = require('./Estudante')(sequelize, Sequelize.DataTypes);

// Associações
Curso.hasMany(Estudante, { foreignKey: 'curso_id', as: 'estudantes' });
Estudante.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });

// Exportar tudo
module.exports = {
  sequelize,
  Curso,
  Estudante
};
