// Importa o módulo databaseconfig do diretório "../../../database"
const db = require("../../../database/databaseconfig");

// Define a função getAllClientes que busca todos os clientes no banco de dados que não foram excluídos (deleted = false)
const getAllClientes = async () => {
  // Executa uma consulta SQL assíncrona no banco de dados usando a função 'db.query'
  // A consulta seleciona todos os campos (*) da tabela 'clientes' e filtra os registros com 'deleted' igual a false
  const result = await db.query(
    "SELECT *" +
    "FROM clientes where deleted = false ORDER BY nome ASC"
  );
  
  // Retorna as linhas de resultado da consulta como um array de objetos (result.rows)
  return result.rows;
}

// Define a função insertClientes que insere um novo cliente no banco de dados
const insertClientes = async (clientesREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Executa uma consulta SQL assíncrona para inserir um novo registro na tabela 'clientes'
    const result = await db.query(
      "INSERT INTO clientes " +
      "values(default, $1, $2, $3, $4, $5)",
      [
        clientesREGPar.codigo,
        clientesREGPar.nome,
        clientesREGPar.endereco,
        clientesREGPar.ativo,
        clientesREGPar.deleted,
      ]
    );
    
    // Obtém o número de linhas afetadas pela operação de inserção
    linhasAfetadas = result.rowCount;
  } catch (error) {
    // Em caso de erro, captura a mensagem de erro e define a mensagem de retorno
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  // Retorna um objeto com a mensagem e o número de linhas afetadas
  return { msg, linhasAfetadas };
};

// Define a função getClienteByID que busca um cliente pelo ID no banco de dados
const getClienteByID = async (clienteIDPar) => {
  // Executa uma consulta SQL assíncrona para selecionar um cliente específico com base no 'clienteid'
  const result = await db.query(
    "SELECT *" +
    "FROM clientes WHERE clienteid = $1 and deleted = false ORDER BY nome ASC",
    [clienteIDPar]
  );

  // Retorna as linhas de resultado da consulta como um array de objetos (result.rows)
  return result.rows;
};

  const updateClientes = async (clienteREGPar) => {
    console.log("[updateCliente]",clienteREGPar)
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE clientes SET " +
            "codigo = $2, " +
            "nome = $3, " +
            "endereco = $4, " +
            "ativo = $5, " +
            "deleted = $6 " +
            "WHERE clienteid = $1",
          [
            clienteREGPar.clienteid,
            clienteREGPar.codigo,
            clienteREGPar.nome,
            clienteREGPar.endereco,
            clienteREGPar.ativo,         
            clienteREGPar.deleted,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlClientes|updateClientes] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };

// Define a função DeleteClientes que marca um cliente como excluído no banco de dados
const DeleteClientes = async (clienteREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    // Executa uma consulta SQL assíncrona para marcar um cliente como excluído (deleted = true)
    const result = await db.query(
      "UPDATE clientes SET " + "deleted = true " + "WHERE clienteid = $1",
      [clienteREGPar.clienteid]
    );
    
    // Obtém o número de linhas afetadas pela operação de exclusão
    linhasAfetadas = result.rowCount;
  } catch (error) {
    // Em caso de erro, captura a mensagem de erro e define a mensagem de retorno
    msg = "[mdlclientes|DeleteClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  // Retorna um objeto com a mensagem e o número de linhas afetadas
  return { msg, linhasAfetadas };
};

// Exporta as funções para que possam ser usadas em outros lugares do código
module.exports = {
  getAllClientes,
  getClienteByID,
  insertClientes,
  updateClientes,
  DeleteClientes
};
