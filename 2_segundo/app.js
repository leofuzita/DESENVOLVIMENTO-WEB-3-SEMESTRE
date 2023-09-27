// arquivo app.js

// Importando o módulo express, que é um framework para criação de aplicativos web em Node.js
const express = require('express');

// Importando o módulo de rotas definido em './routes/route.js'
const router = require('./routes/route');

// Criando uma instância do aplicativo express
const app = express();

// Definindo a porta em que o servidor vai ouvir
const port = 40000;

// Middleware para processar o corpo das requisições como JSON
app.use(express.json());

// Usando as rotas definidas no módulo 'router'
app.use(router);

// Iniciando o servidor e fazendo-o escutar a porta especificada
app.listen(port, () => {
  console.log('App listening at port ${port}');
});
