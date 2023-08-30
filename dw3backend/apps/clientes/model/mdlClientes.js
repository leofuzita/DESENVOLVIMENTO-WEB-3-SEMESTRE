const db = require("../../../database/databaseconfig");

const GetAllClientes = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM clientes where deleted = false ORDER BY descricao ASC"
    )
  ).rows;
};

const GetClienteByID = async (clienteIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM clientes WHERE clienteid = $1 and deleted = false ORDER BY descricao ASC",
      [clienteIDPar]
    )
  ).rows;
};

const InsertClientes = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO clientes " + "values(default, $1, $2, $3, $4)",
        [
          registroPar.codigo,
          registroPar.descricao,
          registroPar.ativo,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Clientes SET " +
          "codigo = $2, " +
          "descricao = $3, " +
          "ativo = $4, " +
          "deleted = $5 " +          
          "WHERE clienteid = $1",
        [
            registroPar.clienteid  ,
            registroPar.codigo   ,
            registroPar.descricao,
            registroPar.ativo    ,
            registroPar.deleted  ,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|UpdateClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE Clientes SET " + "deleted = true " + "WHERE clienteid = $1",
      [registroPar.clienteid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlClientes|DeleteClientes] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllClientes,
  GetClienteByID,
  InsertClientes,
  UpdateClientes,
  DeleteClientes,
};