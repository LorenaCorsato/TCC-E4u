const express = require('express');
const rotas = express.Router();
const calculadoraCarbono = require('../controllers/calculadoraCarbono');
const authMiddleware = require('../middleware/authMiddleware');

rotas.post('/calculate/fisica', authMiddleware, calculadoraCarbono.calcularPegadaFisica);
rotas.post('/calculate/juridica', authMiddleware, calculadoraCarbono.calcularPegadaJuridica);

module.exports = rotas;