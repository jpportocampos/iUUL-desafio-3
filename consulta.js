import { DateTime } from "luxon";

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

export default class Consulta {
    #cpfPaciente;
    #data;

    constructor(paciente, data, horaInicial, horaFinal) {
        this.#cpfPaciente = paciente.cpf;
        if (this.#validaHoraInicial(horaInicial)) {
            this.#horaInicial = horaInicial;
        }
        if (this.#validaHoraFinal(horaFinal)) {
            this.#horaFinal = horaFinal;
        }
        if (this.#validaData(data)) {
            this.#data = data;
        }
    }

    get cpfPaciente() {
        return this.#cpfPaciente;
    }

    get data() {
        return this.#data;
    }

    get horaInicial() {
        return this.#horaInicial;
    }

    get horaFinal() {
        return this.#horaFinal;
    }

    set cpfPacienteConsulta(cpfPaciente) {
        this.#cpfPaciente = cpfPaciente;
    }

    set dataConsulta(data) {
        this.#data = data;
    }

    set horaInicialConsulta(horaInicial) {
        this.#horaInicial = horaInicial;
    }

    set horaFinalConsulta(horaFinal) {
        this.#horaFinal = horaFinal;
    }

    #validaData(data) {
        let dataConsulta = DateTime.fromFormat(data, "dd/LL/yyyy");
        let dataAtual = DateTime.now();

        if (dataConsulta > dataAtual) {
            return true;
        }

        throw new UserException("A data da consulta é inválida (precisa ser futura em relação a data atual)");
    }

    #validaHoraInicial(horaInicial) {
        return true
    }

    #validaHoraFinal(horaFinal) {
        return true
    }
}