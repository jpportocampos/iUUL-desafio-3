import { DataTypes, Model } from "sequelize";

// Extende a classe Model do sequelize para a criação da tabela de pacientes no banco de dados
export default class Pacientes extends Model {
    static init(sequelize) {
        super.init({
            cpf: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING
            },
            dataNascimento: {
                type: DataTypes.STRING
            }
        }, {
            sequelize,
            modelName: "paciente",
            tableName: "pacientes"
        });
    }
}