import { DataTypes, Model } from "sequelize";

// Extende a classe Model do sequelize para a criação da tabela de consultas no banco de dados
export default class Consultas extends Model {
    static init(sequelize) {
        super.init({
            cpfPaciente: {
                type: DataTypes.STRING,
                allowNull: false
            },
            data: {
                type: DataTypes.STRING
            },
            horaInicial: {
                type: DataTypes.STRING
            },
            horaFinal: {
                type: DataTypes.STRING
            }
        }, {
            sequelize,
            modelName: "cosulta",
            tableName: "consultas"
        });
    }
}