// Importando o módulo db que contém a configuração de acesso ao banco de dados
const db = require("../../../database/databaseconfig");

// Função que obtém todos os alunos
const getAllAlunos = async () => {
  // Consulta o banco de dados para obter todos os alunos não deletados
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = alunos.cursoid) " +
      "FROM alunos where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

// Função que obtém um aluno por ID
const getAlunoByID = async (alunoIDPar) => {
  // Consulta o banco de dados para obter um aluno específico pelo ID
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = alunos.cursoid) " +
      "FROM alunos WHERE alunoid = $1 and deleted = false ORDER BY nome ASC",
      [alunoIDPar]
    )
  ).rows;
};

// Função que insere um novo aluno
const insertAlunos = async (alunoREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Executa a inserção do novo aluno no banco de dados
    linhasAfetadas = (
      await db.query(
        "INSERT INTO alunos " +
        "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    // Em caso de erro, define a mensagem de erro e o número de linhas afetadas como -1
    msg = "[mdlAlunos|insertAlunos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função que atualiza um aluno existente
const UpdateAlunos = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Executa a atualização do aluno no banco de dados
    linhasAfetadas = (
      await db.query(
        "UPDATE alunos SET " +
        "prontuario = $2, " +
        "nome = $3, " +
        "endereco = $4, " +
        "rendafamiliar = $5, " +
        "datanascimento = $6, " +
        "cursoid = $7, " +
        "deleted = $8 " +
        "WHERE alunoid = $1",
        [
          alunoREGPar.alunoid,
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    // Em caso de erro, define a mensagem de erro e o número de linhas afetadas como -1
    msg = "[mdlAlunos|UpdateAlunos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função que exclui um aluno
const DeleteAlunos = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    // Executa a exclusão do aluno no banco de dados
    linhasAfetadas = (
      await db.query(
        "UPDATE alunos SET " + "deleted = true " + "WHERE alunoid = $1",
        [alunoREGPar.alunoid]
      )
    ).rowCount;
  } catch (error) {
    // Em caso de erro, define a mensagem de erro e o número de linhas afetadas como -1
    msg = "[mdlAlunos|DeleteAlunos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Exporta as funções para que possam ser utilizadas em outros lugares do código
module.exports = {
  getAllAlunos,
  getAlunoByID,
  insertAlunos,
  UpdateAlunos,
  DeleteAlunos,
};
