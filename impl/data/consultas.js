import { DataTypes, Model } from "sequelize";
import Pacientes from "./pacientes.js";

export default class Consultas extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "O nome do paciente deve ser preenchido" },
                    len: { args: [5, 999999999], msg: "O nome do cluente deve possuir pelo menos 5 caracteres" }
                }
            },
            dataNascimento: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true
                }
            }
        }, {
            sequelize,
            modelName: "paciente",
            tableName: "pacientes"
        });
        
        super.belongsTo(Pacientes, {
            foreignKey: {
                name: 'cpfPaciente',
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O cpf do paciente deve ser preenchido" },
                    unique: true
                }
            }
        });
    }
}