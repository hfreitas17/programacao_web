



const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ano_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'curso',
  timestamps: false
});

module.exports = Curso;

const Estudante = require('./Estudante');
Curso.hasMany(Estudante, {
  foreignKey: 'curso_id',
  as: 'estudantes'
});
