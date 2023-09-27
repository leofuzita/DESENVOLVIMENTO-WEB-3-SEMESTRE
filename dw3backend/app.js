// Importando o módulo express, que é um framework para criação de aplicativos web em Node.js
const express = require('express');

// Importando o módulo body-parser, que ajuda a analisar o corpo das requisições
const bodyParser = require('body-parser');

// Carregando variáveis de ambiente definidas no arquivo .env
require('dotenv').config();

// Importando o módulo de rotas definido em ./routes/router.js
const router = require('./routes/router');

// Criando uma instância do aplicativo express
const app = express();

// Definindo a porta em que o servidor vai ouvir
const port = 40000;

// Configurando a engine de visualização (caso você esteja usando EJS)
// app.set('view engine', 'ejs');

// Usando o body-parser para analisar os dados do corpo das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Usando as rotas definidas no módulo 'router'
app.use(router);

// Iniciando o servidor e fazendo-o escutar a porta especificada
app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
