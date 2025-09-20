
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const calculadoraRotas = require('./src/routes/calculadoraRotas');



const authRotas = require('./src/routes/authRotas');

const app = express();
const PORTA = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', authRotas);
app.use('/api/calculator', calculadoraRotas); // 

app.use('/api/auth', authRotas);

app.get('/', (req, res) => {
  res.send('API está funcionando! 🚀');
});

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});