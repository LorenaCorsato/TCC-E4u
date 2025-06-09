// src/config/firebase.js

// Importa a biblioteca do Firebase Admin
const admin = require('firebase-admin');

// Carrega a chave de serviço que você baixou do Firebase
const chaveDeServico = require('../../serviceAccountKey.json');

// Inicializa o app do Firebase com as credenciais
admin.initializeApp({
  credential: admin.credential.cert(chaveDeServico)
});

// Exporta o objeto 'admin' para ser usado em outras partes do projeto
module.exports = admin;