// Arquivo route.js na pasta routes

// Importando o módulo express para criar um roteador
const express = require("express");
const routerApp = express.Router();

// Importando o módulo ctlHello.js que contém as funções do controlador para lidar com as rotas
const appHello = require("../controller/ctlHello");

// Definindo uma rota GET na raiz ("/") que utiliza a função hello do controlador appHello
routerApp.get("/", appHello.hello);

// Definindo uma rota POST em "/helloUser" que utiliza a função helloUser do controlador appHello
routerApp.post("/helloUser", appHello.helloUser);

// Exportando o roteador para ser utilizado em outros lugares
module.exports = routerApp;
