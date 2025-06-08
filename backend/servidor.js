// servidor.js

// Módulos principais
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importa as rotas de autenticação
const authRotas = require('./src/routes/authRotas');

// Cria a aplicação Express
const app = express();
const PORTA = process.env.PORT || 3001;

// Middlewares essenciais
app.use(cors()); // Permite requisições de outras origens (seu frontend React)
app.use(express.json()); // Habilita o servidor a entender JSON no corpo das requisições

// Define um prefixo para as rotas de autenticação
app.use('/api/auth', authRotas);

// Rota de teste para verificar se a API está no ar
app.get('/', (req, res) => {
  res.send('API está funcionando! 🚀');
});

// Inicia o servidor para escutar na porta definida
app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});