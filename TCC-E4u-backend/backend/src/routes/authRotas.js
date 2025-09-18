const express = require('express');
const rotas = express.Router();

const authControlador = require('../controllers/authControlador');
const authMiddleware = require('../middleware/authMiddleware'); 
const db = require('../config/database'); 

rotas.post('/cadastrar/pf', authControlador.cadastrarPF);
rotas.post('/cadastrar/pj', authControlador.cadastrarPJ);


rotas.get('/profile', authMiddleware, async (req, res) => {
  try {
    const { uid } = req.usuario;

    const { rows } = await db.query(
      'SELECT id_usuario, nome, email_usuario, cpf_usuario, cnpj_usuario, tipo_usuario FROM usuario WHERE firebase_uid = $1', 
      [uid]
    );

    if (rows.length === 0) {
      return res.status(404).send({ mensagem: 'Usuário autenticado mas não encontrado no banco de dados.' });
    }

    res.status(200).send(rows[0]);

  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    res.status(500).send({ mensagem: 'Erro interno ao buscar dados do perfil.' });
  }
});


module.exports = rotas;