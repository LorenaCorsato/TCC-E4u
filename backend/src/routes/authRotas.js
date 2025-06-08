// src/routes/authRotas.js

const express = require('express');
const rotas = express.Router();

// Importa o controlador de autenticação
const authControlador = require('../controllers/authControlador');

// Define as rotas de cadastro
rotas.post('/cadastrar/pf', authControlador.cadastrarPF);
rotas.post('/cadastrar/pj', authControlador.cadastrarPJ);

// Exporta as rotas para serem usadas no servidor principal
module.exports = rotas;