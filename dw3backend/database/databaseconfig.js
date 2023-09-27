// Importando o módulo Pool da biblioteca pg para gerenciar conexões com o banco de dados PostgreSQL
const Pool = require('pg').Pool;

// Criando uma instância de Pool com as configurações de conexão
// Você pode substituir esses valores pelas variáveis de ambiente definidas no arquivo .env
const pool = new Pool({
  user: 'postgres',    // Nome de usuário do banco de dados
  host: '127.0.0.1',   // Endereço do servidor do banco de dados
  database: 'dw3',     // Nome do banco de dados
  password: 'postdba', // Senha do banco de dados
  port: 5432,          // Porta do banco de dados
});

// Exporta um objeto com uma função de consulta que usa a instância de Pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
