// backend/src/routes/placaSolarRotas.js
const express = require('express');
const rotas = express.Router();
const placaSolarControlador = require('../controllers/placaSolarControlador');
const authMiddleware = require('../middleware/authMiddleware'); // O cálculo é para usuários logados

rotas.post('/calculate', authMiddleware, placaSolarControlador.calcularPlacas);

module.exports = rotas;