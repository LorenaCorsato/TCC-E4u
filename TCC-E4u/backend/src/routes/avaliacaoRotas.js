const express = require('express');
const rotas = express.Router();
const avaliacaoControlador = require('../controllers/avaliacaoControlador');
const authMiddleware = require('../middleware/authMiddleware');

rotas.get('/:id_produto', authMiddleware, avaliacaoControlador.getAvaliacoesPorProduto);
rotas.post('/:id_produto', authMiddleware, avaliacaoControlador.postAvaliacao);

module.exports = rotas;

