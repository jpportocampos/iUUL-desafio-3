import { DateTime } from "luxon";
import ConsultaRepository from "../repository/consultaRepository.js";
import PacienteRepository from "../repository/pacienteRepository.js";
import Consulta from "../entity/consulta.js";

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

export default class ConsultaService {
    #consultaRepository = new ConsultaRepository();
    #pacienteRepository = new PacienteRepository();
    
    salvar(cpf, data, horaInicial, horaFinal) {
        if (this.#pacienteRepository.findByCpf(cpf) === "N/A") {
            throw new UserException("Erro: paciente não cadastrado");
        }

        this.#validaData(data, horaInicial);
        this.#validaHorario(horaInicial);
        this.#validaHorario(horaFinal);

        let consulta = new Consulta(cpf, data, horaInicial, horaFinal);

        this.#consultaRepository.save(consulta);

        return true;
    }

    deletar(cpf, data, horaInicial) {
        if (this.#pacienteRepository.findByCpf(cpf) === "N/A") {
            throw new UserException("Erro: paciente não cadastrado");
        }

        return this.#consultaRepository.delete(cpf, data, horaInicial);
    }

    listarAgenda() {
        return this.#consultaRepository.getAll();
    }

    #validaData(data, horaInicial) {
        dataCompleta = data + " " + horaInicial;
        let dataConsulta = DateTime.fromFormat(dataCompleta, "dd/LL/yyyy HHmm");
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