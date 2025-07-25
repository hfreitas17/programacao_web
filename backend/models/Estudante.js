/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/



module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Estudante', {
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
    nascimento: {
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
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cursos',
        key: 'id'
      }
    }
  }, {
    tableName: 'estudantes',
    timestamps: false
  });
};