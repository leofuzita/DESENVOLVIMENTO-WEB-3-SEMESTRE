// Importando o módulo express para criar um roteador
const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appAlunos = require("../apps/alunos/controller/ctlAlunos");
const appCursos = require("../apps/cursos/controller/ctlCursos");

// Middleware específico para este roteador
routerApp.use((req, res, next) => {
  // Este middleware é chamado antes de todas as rotas neste roteador
  // Você pode adicionar lógica aqui que deve ser executada para todas as rotas
  // Por exemplo, você pode fazer a autenticação aqui antes de permitir o acesso às rotas subsequentes
  next(); // Chama a próxima função no pipeline de middleware
});

// Rota inicial ("/") que envia uma mensagem de saudação
routerApp.get("/", (req, res) => {
  res.send("Olá!");
});

// Rotas de Alunos
// Você pode adicionar aqui as rotas relacionadas aos alunos

//Rotas de Alunos
routerApp.get("/getAllAlunos", appAlunos.getAllAlunos);
routerApp.post("/getAlunoByID", appAlunos.getAlunoByID);
routerApp.post("/insertAlunos", appAlunos.insertAlunos);
routerApp.post("/updateAlunos", appAlunos.updateAlunos);
routerApp.post("/DeleteAlunos", appAlunos.DeleteAlunos);

//Rotas de Cursos
routerApp.get("/GetAllCursos", appCursos.GetAllCursos);
routerApp.post("/GetCursoByID", appCursos.GetCursoByID);
routerApp.post("/InsertCursos", appCursos.InsertCursos);
routerApp.post("/UpdateCursos", appCursos.UpdateCursos);
routerApp.post("/DeleteCursos", appCursos.DeleteCursos);

// Rota Login
 routerApp.post("/Login", appLogin.Login);
 routerApp.post("/Logout", appLogin.Logout);

// Exporta o roteador para que ele possa ser utilizado em outros lugares do código
module.exports = routerApp;
