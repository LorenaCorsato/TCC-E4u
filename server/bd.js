// /server/config/db.js
const { Sequelize } = require('sequelize');

// Conexão com o banco de dados
const sequelize = new Sequelize('E4u', 'postgres', '4821', {
  host: 'localhost',
  dialect: 'postgres',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

testConnection();

module.exports = sequelize;
