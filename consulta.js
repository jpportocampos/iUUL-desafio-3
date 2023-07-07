import { DateTime } from "luxon";

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

export default class Consulta {
    #cpfPaciente;
    #dataIni;
    #dataFin;

    constructor(paciente, data, horaInicial, horaFinal) {
        let dataInicial = "";
        let dataFinal = "";
        if (horaFinal <= horaInicial) {
            throw new UserException("Horário inválido (A hora final deve ser maior que a hora inicial)");
        }
        this.#cpfPaciente = paciente.cpf;
        if (this.#validaHorario(horaInicial)) {
            dataInicial = data + " " + horaInicial;
        }
        if (this.#validaHorario(horaFinal)) {
            dataFinal = data + " " + horaFinal;
        }
        if (this.#validaData(dataInicial)) {
            let dataIni = DateTime.fromFormat(dataInicial, "dd/LL/yyyy HHmm");
            this.#dataIni = dataIni;
        }
        if (this.#validaData(dataFinal)) {
            let dataFin = DateTime.fromFormat(dataFinal, "dd/LL/yyyy HHmm");
            this.#dataFin = dataFin;
        }
    }

    get cpfPaciente() {
        return this.#cpfPaciente;
    }

    get dataIni() {
        return this.#dataIni;
    }

    get dataFin() {
        return this.#dataFin;
    }

    set cpfPacienteConsulta(cpfPaciente) {
        this.#cpfPaciente = cpfPaciente;
    }

    set dataIniConsulta(dataIni) {
        this.#dataIni = dataIni;
    }
    
    set dataFinConsulta(dataFin) {
        this.#dataFin = dataFin;
    }

    #validaData(data) {
        let dataConsulta = DateTime.fromFormat(data, "dd/LL/yyyy HHmm");
        let dataAtual = DateTime.now();

        if (dataConsulta > dataAtual) {
            return true;
        }

        throw new UserException("A data da consulta é inválida (precisa ser futura em relação a data atual)");
    }

    #validaHorario(horario){
        const min = horario.toString().slice(2);
        const hora = horario.toString().slice(0, 2);

        if (parseInt(min) === 0 || parseInt(min) === 15 || parseInt(min) === 30) {
            if (parseInt(hora) > 8 || parseInt(hora) < 19) {
                return true;
            }
        }

        throw new UserException("Horário inválido (Os horários são definidos de 15 em 15 minutos)");
    }
}