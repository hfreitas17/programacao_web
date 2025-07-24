/*
* Servidor Express para gerenciamento de requerimentos acadêmicos
* Versão: 1.3
* Data: 23/07/2025
* autor: Hamilton Freitas
*/

/* Os models (modelos) representam as tabelas do banco de dados na aplicação. 
* Eles definem a estrutura dos dados (campos, tipos, restrições) e os relacionamentos entre as tabelas, 
* além de fornecer métodos para criar, consultar, atualizar e deletar registros.
*/


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CategoriasRequerimento', {
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
    instancia_responsavel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
    
  }, {
    tableName: 'categorias_requerimentos',
    timestamps: false 
  });
};