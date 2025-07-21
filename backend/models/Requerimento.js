



const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Estudante = require('./Estudante');
const TipoRequerimento = require('./TipoRequerimento');

const Requerimento = sequelize.define('Requerimento', {
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendente'
  }
});

Requerimento.belongsTo(Estudante);
Requerimento.belongsTo(TipoRequerimento);

module.exports = Requerimento;