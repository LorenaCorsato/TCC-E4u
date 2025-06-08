// src/config/database.js

// Importa a classe Pool da biblioteca do PostgreSQL
const { Pool } = require('pg');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria uma nova instância do Pool com as credenciais do banco
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Exporta um objeto com um método 'query' para executar consultas
module.exports = {
  query: (texto, parametros) => pool.query(texto, parametros),
};