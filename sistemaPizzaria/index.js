//Aqui é o ponto de entrada do servidor, ou seja, é onde o servidor é configurado e iniciado. 
// Ele importa as dependencias necesarias, configura o express, define as rotas da API e inicia o servidor na porta especificada.
//  Ele tambem garante que o banco de dados esteja pronto antes de iniciar o servidor, e trata erros caso haja problemas na inicialização do banco de dados.



require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const { ready } = require('./src/database/sqlite');
const routes    = require('./src/routes/index');

ready.then(() => {
  app.use('/api', routes);

app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

  app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log(`Front-end: http://localhost:${PORT}`);
    console.log('=================================');
  });
}).catch(err => {
  console.error('Erro ao inicializar banco:', err);
  process.exit(1);
});
