// Importando o módulo db que contém a configuração de acesso ao banco de dados
const db = require("../../../database/databaseconfig");

// Função que obtém todos os cursos
const GetAllCursos = async () => {
  // Consulta o banco de dados para obter todos os cursos não deletados
  return (
    await db.query(
      "SELECT * FROM cursos where deleted = false ORDER BY descricao ASC"
    )
  ).rows;
};

// Função que obtém um curso por ID
const GetCursoByID = async (cursoIDPar) => {
  // Consulta o banco de dados para obter um curso específico pelo ID
  return (
    await db.query(
      "SELECT * FROM cursos WHERE cursoid = $1 and deleted = false ORDER BY descricao ASC",
      [cursoIDPar]
    )
  ).rows;
};

// Função que insere um novo curso
const InsertCursos = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Executa a inserção do novo curso no banco de dados
    linhasAfetadas = (
      await db.query(
        "INSERT INTO cursos " + "values(default, $1, $2, $3, $4)",
        [
          registroPar.codigo,
          registroPar.descricao,
          registroPar.ativo,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    // Em caso de erro, define a mensagem de erro e o número de linhas afetadas como -1
    msg = "[mdlCursos|InsertCursos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função que atualiza um curso existente
const UpdateCursos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Executa a atualização do curso no banco de dados
    linhasAfetadas = (
      await db.query(
        "UPDATE cursos SET " +
        "codigo = $2, " +
        "descricao = $3, " +
        "ativo = $4, " +
        "deleted = $5 " +          
        "WHERE cursoid = $1",
        [
          registroPar.cursoid,
          registroPar.codigo,
          registroPar.descricao,
          registroPar.ativo,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    // Em caso de erro, define a mensagem de erro e o número de linhas afetadas como -1
    msg = "[mdlCursos|UpdateCursos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função que exclui um curso
const DeleteCursos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    // Executa a exclusão do curso no banco de dados
    linhasAfetadas = (
      await db.query(
        "UPDATE cursos SET " + "deleted = true " + "WHERE cursoid = $1",
        [registroPar.cursoid]
      )
    ).rowCount;
  } catch (error) {
    // Em caso de erro, define a mensagem de erro e o número de linhas afetadas como -1
    msg = "[mdlCursos|DeleteCursos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Exporta as funções para que possam ser utilizadas em outros lugares do código
module.exports = {
  GetAllCursos,
  GetCursoByID,
  InsertCursos,
  UpdateCursos,
  DeleteCursos,
};
