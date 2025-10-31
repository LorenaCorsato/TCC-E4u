
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const calculadoraRotas = require('./src/routes/calculadoraRotas');
const historicoRotas = require('./src/routes/historicoRotas'); 
const authRotas = require('./src/routes/authRotas');
const placaSolarRotas = require('./src/routes/placaSolarRotas');   
const avaliacaoRotas = require('./src/routes/avaliacaoRotas');


const app = express();
const PORTA = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições apenas do seu frontend
  exposedHeaders: ['Authorization'], // Permite que o frontend veja certos cabeçalhos
  allowedHeaders: ['Content-Type', 'Authorization'] // Permite que o frontend ENVIE estes cabeçalhos
}));

app.use(express.json()); 

app.use('/api/auth', authRotas);
app.use('/api/calculator', calculadoraRotas);  
app.use('/api/solar', placaSolarRotas);
app.use('/api/historico', historicoRotas); 
app.use('/api/avaliacoes', avaliacaoRotas);      



app.get('/', (req, res) => {
  res.send('API está funcionando! 🚀');
});

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});