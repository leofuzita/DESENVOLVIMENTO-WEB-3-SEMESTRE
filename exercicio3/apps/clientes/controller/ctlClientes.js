  // Importa o módulo mdlClientes do diretório "../model/mdlClientes"
  const mdlClientes = require("../model/mdlClientes");

  // Define uma função chamada getAllClientes com dois parâmetros: req (requisição) e res (resposta)
  const getAllClientes = async (req, res) => {
    // Dentro da função, declaramos uma variável chamada 'registro' para armazenar os resultados da consulta
    // Usamos a palavra-chave 'await' para aguardar a conclusão da função 'mdlClientes.getAllClientes()'
    let registro = await mdlClientes.getAllClientes();
    
    // Quando a função 'getAllClientes' é concluída, enviamos uma resposta JSON para o cliente
    // A resposta contém um objeto JSON com duas propriedades: 'status' e 'registro'
    // 'status' é uma string com o valor "ok"
    // 'registro' contém os dados obtidos da função 'mdlClientes.getAllClientes()'
    res.json({ status: "ok", "registro": registro });
  };


  // Define uma função chamada insertClientes com dois parâmetros: request (requisição) e res (resposta)
  const insertClientes = async (request, res) => {
    // Obtém os dados do cliente a ser inserido do corpo da requisição
    const ClientesREG = request.body;
    
    // Usa a palavra-chave 'await' para aguardar a conclusão da função 'mdlClientes.insertClientes()'
    let { msg, linhasAfetadas } = await mdlClientes.insertClientes(ClientesREG);
    
    // Quando a função 'insertClientes' é concluída, enviamos uma resposta JSON para o cliente
    // A resposta contém um objeto JSON com duas propriedades: 'status' e 'linhasAfetadas'
    // 'status' é uma string com a mensagem obtida da função 'mdlClientes.insertClientes()'
    // 'linhasAfetadas' contém o número de linhas afetadas pela inserção
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  };

  // Define uma função chamada getClienteByID com dois parâmetros: req (requisição) e res (resposta)
  const getClienteByID = async (req, res) => {
    // Obtém o ID do cliente a ser buscado a partir dos parâmetros da requisição
    const clienteid = parseInt(req.body.clienteid);
    
    // Usa a palavra-chave 'await' para aguardar a conclusão da função 'mdlClientes.getClienteByID()'
    let registro = await mdlClientes.getClienteByID(clienteid);
    
    // Quando a função 'getClienteByID' é concluída, enviamos uma resposta JSON para o cliente
    // A resposta contém um objeto JSON com duas propriedades: 'status' e 'registro'
    // 'status' é uma string com o valor "ok"
    // 'registro' contém os dados do cliente obtidos da função 'mdlClientes.getClienteByID()'
    res.json({ status: "ok", registro: registro });
  };

  // Define uma função chamada updateClientes com dois parâmetros: request (requisição) e res (resposta)
  const updateClientes = async (request, res) => {
    // Obtém os dados do cliente a ser atualizado do corpo da requisição
    const clienteREG = request.body;
    
    // Usa a palavra-chave 'await' para aguardar a conclusão da função 'mdlClientes.updateClientes()'
    let  { msg, linhasAfetadas } = await mdlClientes.updateClientes(clienteREG);
    
    // Quando a função 'updateClientes' é concluída, enviamos uma resposta JSON para o cliente
    // A resposta contém um objeto JSON com duas propriedades: 'status' e 'linhasAfetadas'
    // 'status' é uma string com a mensagem obtida da função 'mdlClientes.updateClientes()'
    // 'linhasAfetadas' contém o número de linhas afetadas pela atualização
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  };

  // Define uma função chamada DeleteClientes com dois parâmetros: request (requisição) e res (resposta)
  const DeleteClientes = async (request, res) => {
    // Obtém os dados do cliente a ser excluído do corpo da requisição
    const clienteREG = request.body;
    
    // Usa a palavra-chave 'await' para aguardar a conclusão da função 'mdlClientes.DeleteClientes()'
    let { msg, linhasAfetadas } = await mdlClientes.DeleteClientes(clienteREG);
    
    // Quando a função 'DeleteClientes' é concluída, enviamos uma resposta JSON para o cliente
    // A resposta contém um objeto JSON com duas propriedades: 'status' e 'linhasAfetadas'
    // 'status' é uma string com a mensagem obtida da função 'mdlClientes.DeleteClientes()'
    // 'linhasAfetadas' contém o número de linhas afetadas pela exclusão
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  };
  // Exporta as funções para que possam ser usadas em outros lugares do código
  module.exports = {
    getAllClientes,
    insertClientes,
    getClienteByID,
    updateClientes,
    DeleteClientes
  };
