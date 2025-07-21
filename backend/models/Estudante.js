



const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Estudante = sequelize.define('Estudante', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  }//,
  //curso_id: {
  //  type: DataTypes.INTEGER,
  //  allowNull: true,
  //  references: {
  //    model: 'Cursos', // Nome da tabela referenciada
  //    key: 'id'
  //  }
  //}

});

module.exports = Estudante;