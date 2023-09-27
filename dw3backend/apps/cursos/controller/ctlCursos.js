// Importando o módulo mdlCursos que contém as funções do modelo para lidar com operações relacionadas a cursos
const mdlCursos = require("../model/mdlCursos");

// Função que obtém todos os cursos
const GetAllCursos = (req, res) =>
  (async () => {
    // Chama a função do modelo para buscar todos os cursos
    let registro = await mdlCursos.GetAllCursos();
    // Retorna um objeto JSON com o status "ok" e os registros obtidos
    res.json({ status: "ok", registro: registro });
  })();

// Função que obtém um curso por ID
const GetCursoByID = (req, res) =>
  (async () => {
    // Obtém o ID do curso a partir do corpo da requisição
    const cursoID = parseInt(req.body.cursoid);
    // Chama a função do modelo para buscar o curso pelo ID
    let registro = await mdlCursos.GetCursoByID(cursoID);
    // Retorna um objeto JSON com o status "ok" e o registro obtido
    res.json({ status: "ok", registro: registro });
  })();

// Função que insere um novo curso
const InsertCursos = (request, res) =>
  (async () => {
    // Obtém os dados do curso a partir do corpo da requisição
    const registro = request.body;
    // Chama a função do modelo para inserir o curso
    let { msg, linhasAfetadas } = await mdlCursos.InsertCursos(registro);
    // Retorna um objeto JSON com o status da operação e o número de linhas afetadas
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// Função que atualiza um curso existente
const UpdateCursos = (request, res) =>
  (async () => {
    // Obtém os dados do curso a partir do corpo da requisição
    const registro = request.body;
    // Chama a função do modelo para atualizar o curso
    let { msg, linhasAfetadas } = await mdlCursos.UpdateCursos(registro);
    // Retorna um objeto JSON com o status da operação e o número de linhas afetadas
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// Função que exclui um curso
const DeleteCursos = (request, res) =>
  (async () => {
    // Obtém os dados do curso a partir do corpo da requisição
    const registro = request.body;
    // Chama a função do modelo para excluir o curso
    let { msg, linhasAfetadas } = await mdlCursos.DeleteCursos(registro);
    // Retorna um objeto JSON com o status da operação e o número de linhas afetadas
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

// Exporta as funções para que possam ser utilizadas em outros lugares do código
module.exports = {
  GetAllCursos,
  GetCursoByID,
  InsertCursos,
  UpdateCursos,
  DeleteCursos
};
