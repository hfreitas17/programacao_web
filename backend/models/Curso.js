



//const { DataTypes } = require('sequelize');
//const sequelize = require('../database/db');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Curso', {
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
    tableName: 'Cursos',
    timestamps: false
  });
};

