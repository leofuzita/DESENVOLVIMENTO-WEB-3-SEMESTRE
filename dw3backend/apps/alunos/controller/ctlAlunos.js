// Importando o módulo mdlAlunos que contém as funções do modelo para lidar com operações relacionadas a alunos
const mdlAlunos = require("../model/mdlAlunos");

// Função que obtém todos os alunos
const getAllAlunos = (req, res) =>
  (async () => {
    // Chama a função do modelo para buscar todos os alunos
    let registro = await mdlAlunos.getAllAlunos();
    // Retorna um objeto JSON com o status "ok" e os registros obtidos
    res.json({ status: "ok", registro: registro });
  })();

// Função que obtém um aluno por ID
const getAlunoByID = (req, res) =>
  (async () => {
    // Obtém o ID do aluno a partir do corpo da requisição
    const alunoID = parseInt(req.body.alunoid);
    // Chama a função do modelo para buscar o aluno pelo ID
    let registro = await mdlAlunos.getAlunoByID(alunoID);
    // Retorna um objeto JSON com o status "ok" e o registro obtido
    res.json({ status: "ok", registro: registro });
  })();

// Função que insere um novo aluno
const insertAlunos = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const alunoREG = request.body;
    // Chama a função do modelo para inserir o aluno
    let { msg, linhasAfetadas } = await mdlAlunos.insertAlunos(alunoREG);
    // Retorna um objeto JSON com o status da operação e o número de linhas afetadas
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

// Função que atualiza um aluno existente
const updateAlunos = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    // Chama a função do modelo para atualizar o aluno
    let  { msg, linhasAfetadas } = await mdlAlunos.UpdateAlunos(alunoREG);
    // Retorna um objeto JSON com o status da operação e o número de linhas afetadas
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

// Função que exclui um aluno
const DeleteAlunos = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    // Chama a função do modelo para excluir o aluno
    let { msg, linhasAfetadas } = await mdlAlunos.DeleteAlunos(alunoREG);
    // Retorna um objeto JSON com o status da operação e o número de linhas afetadas
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

// Exporta as funções para que possam ser utilizadas em outros lugares do código
module.exports = {
  getAllAlunos,
  getAlunoByID,
  insertAlunos,
  updateAlunos,
  DeleteAlunos
};
