// src/routes/authRotas.js

const express = require('express');
const rotas = express.Router();

const authControlador = require('../controllers/authControlador');

rotas.post('/cadastrar/pf', authControlador.cadastrarPF);
rotas.post('/cadastrar/pj', authControlador.cadastrarPJ);
rotas.post('/login', authControlador.loginUsuario);


module.exports = rotas;