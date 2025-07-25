
const admin = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const tokenDecodificado = await admin.auth().verifyIdToken(token);
    
    req.usuario = tokenDecodificado;
    
    next();
  } catch (erro) {
    console.error('Erro ao verificar o token:', erro);
    return res.status(403).send({ mensagem: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;