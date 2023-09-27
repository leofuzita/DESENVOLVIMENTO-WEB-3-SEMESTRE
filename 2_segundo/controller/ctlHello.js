// Arquivo ctlHello.js dentro da pasta controller

// Função que lida com a rota "hello"
const hello = (req, res) => {
    // Envia uma resposta JSON com um objeto contendo o status e a mensagem "Olá segundo!"
    res.json({ status: "ok", mensagem: "Olá segundo!" });
  };
  
  // Função que lida com a rota "helloUser"
  const helloUser = (req, res) => {
    // Extrai o valor do campo "username" do corpo da requisição
    const { username } = req.body;
  
    // Envia uma resposta JSON com um objeto contendo o status e o nome de usuário extraído
    res.json({ status: "ok", nomeusuario: username });
  };
  
  // Exporta as funções para que possam ser utilizadas em outros lugares
  module.exports = {
    hello,
    helloUser,
  };
