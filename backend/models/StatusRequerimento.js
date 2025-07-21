



const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const StatusRequerimento = sequelize.define('StatusRequerimento', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = StatusRequerimento;