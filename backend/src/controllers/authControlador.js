// src/controllers/authControlador.js

const admin = require('../config/firebase');
const db = require('../config/database');

// Função para cadastrar Pessoa Física
exports.cadastrarPF = async (req, res) => {
  // Pega apenas os dados necessários do corpo da requisição
  const { email, cpf, senha } = req.body;

  // Validação simples
  if (!email || !cpf || !senha) {
    return res.status(400).send({ mensagem: 'Email, CPF e senha são obrigatórios.' });
  }

  try {
    // 1. Cria o usuário no Firebase Authentication (apenas com email e senha)
    const registroDeUsuario = await admin.auth().createUser({
      email: email,
      password: senha,
    });

    // 2. Pega o UID gerado pelo Firebase
    const { uid } = registroDeUsuario;

    // 3. Salva os dados complementares no seu banco PostgreSQL
    const consultaSQL = `
      INSERT INTO usuario(email_usuario, cpf_usuario, tipo_usuario, firebase_uid)
      VALUES($1, $2, 'fisica', $3)
      RETURNING id_usuario, email_usuario;
    `;
    const valores = [email, cpf, uid];

    const { rows } = await db.query(consultaSQL, valores);

    res.status(201).send({ mensagem: 'Usuário físico criado com sucesso!', usuario: rows[0] });

  } catch (erro) {
    console.error('Erro ao criar usuário físico:', erro);
    // Retorna uma mensagem de erro genérica para o cliente
    res.status(500).send({ mensagem: 'Erro no servidor ao criar usuário.', detalhe: erro.message });
  }
};

// Função para cadastrar Pessoa Jurídica
exports.cadastrarPJ = async (req, res) => {
  // Pega apenas os dados necessários do corpo da requisição
  const { email, cnpj, senha } = req.body;

  // Validação simples
  if (!email || !cnpj || !senha) {
    return res.status(400).send({ mensagem: 'Email, CNPJ e senha são obrigatórios.' });
  }

  try {
    // 1. Cria o usuário no Firebase Authentication
    const registroDeUsuario = await admin.auth().createUser({
      email: email,
      password: senha,
    });

    // 2. Pega o UID gerado pelo Firebase
    const { uid } = registroDeUsuario;

    // 3. Salva os dados complementares no seu banco PostgreSQL
    const consultaSQL = `
      INSERT INTO usuario(email_usuario, cnpj_usuario, tipo_usuario, firebase_uid)
      VALUES($1, $2, 'juridica', $3)
      RETURNING id_usuario, email_usuario;
    `;
    const valores = [email, cnpj, uid];
    
    const { rows } = await db.query(consultaSQL, valores);

    res.status(201).send({ mensagem: 'Usuário jurídico criado com sucesso!', usuario: rows[0] });

  } catch (erro) {
    console.error('Erro ao criar usuário jurídico:', erro);
    res.status(500).send({ mensagem: 'Erro no servidor ao criar usuário.', detalhe: erro.message });
  }
};