
const admin = require('firebase-admin');

const chaveDeServico = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(chaveDeServico)
});

module.exports = admin;