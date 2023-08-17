import { Sequelize } from "sequelize";

 // Gera uma constante com a conexão do banco
export const sequelize = new Sequelize('postgres://postgres:pass123@localhost:5432/consultorio'); // Caso seja necessário conectar a um banco diferente, alterar o parâmetro desta variável