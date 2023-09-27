// Importando o módulo de configuração do banco de dados a partir do caminho relativo
const db = require("../../../database/databaseconfig");

// Função assíncrona que busca as credenciais do usuário com base no nome de usuário
const GetCredencial = async (loginPar) => {
    // Realiza uma consulta no banco de dados usando db.query() e retorna as linhas resultantes
    return (
        await db.query(
            "select username, password " +
            "from usuarios where username = $1 and deleted = false", [loginPar]
        )
    ).rows; // Retorna as linhas resultantes da consulta
};

// Exporta a função GetCredencial para que ela possa ser usada em outros lugares do código
module.exports = {
    GetCredencial,
};
