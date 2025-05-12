const bcrypt = require('bcryptjs');
const User = require('../models/usuario'); 
const { signInWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../../src/firebase'); 

// Função de login
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar a autenticação com o Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Buscar o usuário no banco de dados PostgreSQL
    const usuario = await User.findOne({ where: { email: email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar a senha (se necessário)
    const senhaValida = await bcrypt.compare(senha, usuario.senha_usuario);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha inválida' });
    }

    // Retornar os dados do usuário
    res.status(200).json({
      message: 'Login bem-sucedido',
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        tipo_usuario: usuario.tipo_usuario,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao realizar login' });
  }
};

module.exports = { login };
