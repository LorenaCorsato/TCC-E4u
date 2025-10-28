const express = require('express');
const rotas = express.Router();
const historicoControlador = require('../controllers/historicoControlador');
const authMiddleware = require('../middleware/authMiddleware');

rotas.get('/footprint', authMiddleware, historicoControlador.getFootprintHistory);

module.exports = rotas;