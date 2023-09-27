const db = require("../../../database/databaseconfig");

const getAllPedidos = async () => {
  try {
    const result = await db.query(
      "SELECT * FROM pedidos WHERE deleted = false ORDER BY numero ASC"
    );

    return result.rows;
  } catch (error) {
    console.error("[mdlPedidos|getAllPedidos]", error);
    throw error;
  }
}

const insertPedidos = async (pedidosREGPar) => {
  try {
    const result = await db.query(
      "INSERT INTO pedidos (numero, data, valortotal, clienteid, deleted) VALUES ($1, $2, $3, $4, $5)",
      [
        pedidosREGPar.numero,
        pedidosREGPar.data,
        pedidosREGPar.valortotal,
        pedidosREGPar.clienteid,
        pedidosREGPar.deleted,
      ]
    );

    const linhasAfetadas = result.rowCount;
    const msg = "ok";

    return { msg, linhasAfetadas };
  } catch (error) {
    console.error("[mdlPedidos|insertPedidos]", error);
    throw error;
  }
};

const getPedidoByID = async (pedidoIDPar) => {
  try {
    const result = await db.query(
      "SELECT * FROM pedidos WHERE pedidoid = $1 AND deleted = false ORDER BY data ASC",
      [pedidoIDPar]
    );

    return result.rows;
  } catch (error) {
    console.error("[mdlPedidos|getPedidoByID]", error);
    throw error;
  }
};

const updatePedidos = async (pedidosREGPar) => {
  try {
    const result = await db.query(
      "UPDATE pedidos SET numero = $2, data = $3, valortotal = $4, clienteid = $5, deleted = $6 WHERE pedidoid = $1",
      [
        pedidosREGPar.pedidoid,
        pedidosREGPar.numero,
        pedidosREGPar.data,
        pedidosREGPar.valortotal,
        pedidosREGPar.clienteid,
        pedidosREGPar.deleted,
      ]
    );

    const linhasAfetadas = result.rowCount;
    const msg = "ok";

    return { msg, linhasAfetadas };
  } catch (error) {
    console.error("[mdlPedidos|updatePedidos]", error);
    throw error;
  }
};

const DeletePedidos = async (pedidosREGPar) => {
  try {
    const result = await db.query(
      "UPDATE pedidos SET deleted = true WHERE pedidoid = $1",
      [pedidosREGPar.pedidoid]
    );

    const linhasAfetadas = result.rowCount;
    const msg = "ok";

    return { msg, linhasAfetadas };
  } catch (error) {
    console.error("[mdlPedidos|DeletePedidos]", error);
    throw error;
  }
};

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  DeletePedidos
};
