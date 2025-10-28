const express = require('express');
const rotas = express.Router();
const placaSolarControlador = require('../controllers/placaSolarControlador');
const authMiddleware = require('../middleware/authMiddleware');

rotas.post('/calculate', authMiddleware, placaSolarControlador.calcularPlacas);

module.exports = rotas;