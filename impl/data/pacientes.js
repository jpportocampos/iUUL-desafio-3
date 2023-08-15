import { DataTypes, Model } from "sequelize";

export default class Pacientes extends Model {
    static init(sequelize) {
        super.init({
            cpf: {
                type: DataTypes.INTEGER,
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