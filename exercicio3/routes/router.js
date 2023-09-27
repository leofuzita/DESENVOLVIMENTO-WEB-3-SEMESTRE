// Importando o módulo express para criar um roteador
const express = require("express");
const routerApp = express.Router();
const appClientes = require("../apps/clientes/controller/ctlClientes");
const appPedidos = require("../apps/pedidos/controller/ctlPedidos");


// Middleware específico para este roteador
routerApp.use((req, res, next) => {
  // Este middleware é chamado antes de todas as rotas neste roteador
  // Você pode adicionar lógica aqui que deve ser executada para todas as rotas
  // Por exemplo, você pode fazer a autenticação aqui antes de permitir o acesso às rotas subsequentes
  next(); // Chama a próxima função no pipeline de middleware
});

// Rota inicial ("/") que envia uma mensagem de saudação
routerApp.get("/", (req, res) => {
  res.send("Olá! DIMASSSS");
});

routerApp.get("/getAllClientes", appClientes.getAllClientes);
routerApp.post("/getClienteByID", appClientes.getClienteByID);
routerApp.post("/insertClientes", appClientes.insertClientes);
routerApp.post("/updateClientes", appClientes.updateClientes);
routerApp.post("/DeleteClientes", appClientes.DeleteClientes);


routerApp.get("/getAllPedidos", appPedidos.getAllPedidos);
routerApp.post("/getPedidosByID", appPedidos.getPedidoByID);
routerApp.post("/insertPedidos", appPedidos.insertPedidos);
routerApp.post("/updatePedidos", appPedidos.updatePedidos);
routerApp.post("/DeletePedidos", appPedidos.DeletePedidos);


module.exports = routerApp;