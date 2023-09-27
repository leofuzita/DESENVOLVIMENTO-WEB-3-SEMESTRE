// Importando o módulo jsonwebtoken para gerar e verificar tokens JWT
const jwt = require("jsonwebtoken");

// Importando o módulo bCrypt para lidar com funções de hash e comparação de senhas
const bCrypt = require("bcryptjs");

// Importando o módulo mdlLogin que contém a função GetCredencial para buscar credenciais no banco de dados
const mdlLogin = require("../model/mdlLogin");

// Função assíncrona que lida com a autenticação de login
const Login = async (req, res, next) => {
    // Busca as credenciais do usuário com base no nome de usuário
    const credencial = await mdlLogin.GetCredencial(req.body.username);

    // Verifica se o usuário foi encontrado
    if (credencial.length == 0) {
        return res.status(200).json({ message: "Usuário não identificado!" });
    }
    
    // Verifica se a senha enviada corresponde à senha armazenada após a hash
    if (bCrypt.compareSync(req.body.password, credencial[0].password)) {
        // Autenticação bem-sucedida
        const username = credencial[0].username;
        // Gera um token JWT com o nome de usuário e uma chave secreta, definindo um tempo de expiração
        const token = jwt.sign({ username }, process.env.SECRET_API, {
            expiresIn: 600, // expira em 10 minutos
        });
        return res.json({ auth: true, token: token });
    }
    // Senha incorreta
    res.status(200).json({ message: "Login inválido!" });
};

// Função que verifica um token JWT para autenticação
function AutenticaJWT(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader)
        return res
            .status(200)
            .json({ auth: false, message: "Não foi informado o token JWT" });
    
    // Divide o cabeçalho para obter apenas o token
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];
    
    // Verifica a validade do token usando a chave secreta
    jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
        if (err)
            return res
                .status(200)
                .json({ auth: false, message: "JWT inválido ou expirado" });
        
        // Se o token for válido, armazena o ID do usuário na requisição e continua para a próxima função
        req.userId = decoded.id;
        next();
    });
}

// Função que lida com o logout, invalidando o token
const Logout = (req, res, next) => {
    res.json({ auth: false, token: null });
};

// Exporta as funções para que possam ser usadas em outros lugares do código
module.exports = {
    Login,
    Logout,
    AutenticaJWT,
};
