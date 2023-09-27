const mdlPedidos = require("../model/mdlPedidos");

const getAllPedidos = async (req, res) => {
  try {
    let registro = await mdlPedidos.getAllPedidos();
    res.json({ status: "ok", registro: registro });
  } catch (error) {
    console.error("[getAllPedidos]", error);
    res.status(500).json({ status: "error", message: "Erro ao buscar pedidos." });
  }
};

const insertPedidos = async (request, res) => {
  try {
    const PedidosREG = request.body;
    let { msg, linhasAfetadas } = await mdlPedidos.insertPedidos(PedidosREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  } catch (error) {
    console.error("[insertPedidos]", error);
    res.status(500).json({ status: "error", message: "Erro ao inserir pedido." });
  }
};

const getPedidoByID = async (req, res) => {
  try {
    const pedidoid = parseInt(req.body.pedidoid);
    let registro = await mdlPedidos.getPedidoByID(pedidoid);
    res.json({ status: "ok", registro: registro });
  } catch (error) {
    console.error("[getPedidoByID]", error);
    res.status(500).json({ status: "error", message: "Erro ao buscar pedido por ID." });
  }
};

const updatePedidos = async (request, res) => {
  try {
    const pedidosREG = request.body;
    let { msg, linhasAfetadas } = await mdlPedidos.updatePedidos(pedidosREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  } catch (error) {
    console.error("[updatePedidos]", error);
    res.status(500).json({ status: "error", message: "Erro ao atualizar pedido." });
  }
};

const DeletePedidos = async (request, res) => {
  try {
    const pedidosREG = request.body;
    let { msg, linhasAfetadas } = await mdlPedidos.DeletePedidos(pedidosREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
} catch (error) {
  console.error("[DeletePedidos]", error);
  res.status(500).json({ status: "error", message: "Erro ao excluir pedido." });
}
};

module.exports = {
getAllPedidos,
insertPedidos,
getPedidoByID,
updatePedidos,
DeletePedidos
};
