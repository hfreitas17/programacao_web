/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Requerimento', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    data_solicitacao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    observacoes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      //defaultValue: 'Em Aberto'
    },
    estudante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estudantes',
        key: 'id'
      }
    },
    categorias_requerimento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorias_requerimentos',
        key: 'id'
      }
    }
  }, {
    tableName: 'requerimentos',
    timestamps: false
  });
};