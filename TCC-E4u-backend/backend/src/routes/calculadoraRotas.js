const express = require('express');
const rotas = express.Router();
const calculadoraCarbono = require('../controllers/calculadoraCarbono');
const authMiddleware = require('../middleware/authMiddleware');

rotas.post('/calculate', authMiddleware, calculadoraCarbono.calcularPegada);

module.exports = rotas;