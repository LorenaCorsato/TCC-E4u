// src/middleware/authMiddleware.js

const admin = require('../config/firebase');

// Middleware para verificar a autenticação do usuário
const authMiddleware = async (req, res, next) => {
  // Pega o token do cabeçalho 'Authorization'
  // O formato esperado é "Bearer <token>"
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    // Se não houver token, retorna erro 401 (Não Autorizado)
    return res.status(401).send({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica se o token é válido usando o Firebase Admin SDK
    const tokenDecodificado = await admin.auth().verifyIdToken(token);
    
    // Adiciona os dados do usuário (uid, email, etc.) ao objeto 'req'
    // para que possam ser usados nas próximas rotas
    req.usuario = tokenDecodificado;
    
    // Passa para a próxima função (o controlador da rota)
    next();
  } catch (erro) {
    console.error('Erro ao verificar o token:', erro);
    // Se o token for inválido ou expirado, retorna erro 403 (Proibido)
    return res.status(403).send({ mensagem: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;