



const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const TipoRequerimento = sequelize.define('TipoRequerimento', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = TipoRequerimento;