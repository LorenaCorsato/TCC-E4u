// /server/models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj_usuario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cpf_usuario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  senha_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuario',  
  timestamps: false,       
});

module.exports = Usuario;
