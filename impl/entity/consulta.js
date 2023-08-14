import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database.js";
import Paciente from "./paciente.js";

export default class Consulta extends Model {
    // Atributos da consulta
    #cpfPaciente;
    #data;
    #horaInicial;
    #horaFinal;

    // Função construtora da consulta
    constructor(cpfPaciente, data, horaInicial, horaFinal) {
        this.#cpfPaciente = cpfPaciente
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
    }

    // Função para recuperar o cpf do paciente atrelado à consulta
    get cpfPaciente() {
        return this.#cpfPaciente;
    }

    // Função para recuperar a data da consulta
    get data() {
        return this.#data;
    }

    // Função para recuperar a hora inicial da consulta
    get horaInicial() {
        return this.#horaInicial;
    }

    // Função para recuperar a hora final da consulta
    get horaFinal() {
        return this.#horaFinal;
    }

    // Função para alterar o cpf do paciente atrelado à consulta
    set cpfPacienteConsulta(cpfPaciente) {
        this.#cpfPaciente = cpfPaciente;
    }

    // Função para alterar a data da consulta
    set dataConsulta(data) {
        this.#data = data;
    }
    
    // Função para alterar a hora inicial da consulta
    set horaInicialConsulta(horaInicial) {
        this.#horaInicial = horaInicial;
    }
    
    // Função para alterar a hora final da consulta
    set horaFinalConsulta(horaFinal) {
        this.#horaFinal = horaFinal;
    }
}

Consulta.init({
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

Consulta.belongsTo(Paciente, {
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