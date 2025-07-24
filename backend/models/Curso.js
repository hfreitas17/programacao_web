/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/



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
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'estudantes',
        key: 'id'
      }
    }

  }, {
    tableName: 'cursos',
    timestamps: false
  });
};

