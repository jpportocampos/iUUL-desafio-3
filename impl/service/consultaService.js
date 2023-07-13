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
        let paciente = this.#pacienteRepository.findByCpf(cpf);
        if (paciente === "N/A") {
            throw new UserException("Erro: paciente não cadastrado");
        }

        this.#validaData(data, horaInicial, paciente);
        this.#validaHorario(horaInicial);
        this.#validaHorario(horaFinal);

        let consulta = new Consulta(cpf, data, horaInicial, horaFinal);

        return this.#consultaRepository.save(consulta);
    }

    deletar(cpf, data, horaInicial) {
        if (this.#pacienteRepository.findByCpf(cpf) === "N/A") {
            throw new UserException("Erro: paciente não cadastrado");
        }

        return this.#consultaRepository.delete(cpf, data, horaInicial);
    }

    listarAgendaToda() {
        let list = this.#consultaRepository.getAll();

        
        list.forEach(n => {
            n.tempo = this.#calculaTempo(n.horaInicial, n.horaFinal);
            n.horaInicialConsulta = DateTime.fromFormat(n.horaInicial, "HHmm").toFormat("HH:mm");
            n.horaFinalConsulta = DateTime.fromFormat(n.horaFinal, "HHmm").toFormat("HH:mm");
            n.nome = this.#pacienteRepository.findByCpf(n.cpfPaciente).nome;
            n.dataNascimento = this.#pacienteRepository.findByCpf(n.cpfPaciente).dataNascimento;
        });

        return list;
    }

    listarAgendaParcial(dataIni, dataFin) {
        let list = this.#consultaRepository.getAll();
        let dataInicial = DateTime.fromFormat(dataIni.toString(), "dd/LL/yyyy");
        let dataFinal = DateTime.fromFormat(dataFin.toString(), "dd/LL/yyyy");

        for (let index = 0; index < list.length; index++) {
            let dataConsulta = DateTime.fromFormat(list[index].data, "dd/LL/yyyy");
            if (dataConsulta < dataInicial || dataConsulta > dataFinal) {
                list.splice(index, 1);
            } else {
                list[index].tempo = this.#calculaTempo(list[index].horaInicial, list[index].horaFinal);
                list[index].horaInicialConsulta = DateTime.fromFormat(list[index].horaInicial, "HHmm").toFormat("HH:mm");
                list[index].horaFinalConsulta = DateTime.fromFormat(list[index].horaFinal, "HHmm").toFormat("HH:mm");
                list[index].nome = this.#pacienteRepository.findByCpf(list[index].cpfPaciente).nome;
                list[index].dataNascimento = this.#pacienteRepository.findByCpf(list[index].cpfPaciente).dataNascimento;
            }
        }

        return list;
    }

    #validaData(data, horaInicial, paciente) {
        if (data[2] !== "/" || data[5] !== "/" || data.length !== 10) {
            throw new UserException("Erro: a data precisa estar no formato dd/mm/yyyy");
        }

        if (horaInicial.length !== 4) {
            throw new UserException("Erro: os horários precisam estar no formato HHmm");
        }

        let dataCompleta = data + " " + horaInicial;
        let dataConsulta = DateTime.fromFormat(dataCompleta, "dd/LL/yyyy HHmm");
        let dataAtual = DateTime.now();

        for (let index = 0; index < this.#consultaRepository.consultasList.length; index++) {
            if (paciente !== "N/A") {
                let dataPaciente = paciente.data + " " + paciente.horaInicial;    
                let dataConsultaPaciente = DateTime.fromFormat(dataPaciente, "dd/LL/yyyy HHmm");

                if (dataConsultaPaciente > dataAtual) {
                    throw new UserException("Erro: o paciente já tem uma consulta futura agendada");
                }
            }
        }

        if (dataConsulta > dataAtual) {
            if (this.#consultaRepository.findByData(data, horaInicial) !== "N/A") {
                throw new UserException("Erro: já existe uma consulta agendada nesse horário");
            }
            return true;
        } else {
            throw new UserException("Erro: a data da consulta precisa ser futura em relação a data atual");
        }
    }

    #validaHorario(horario){
        if (horario.length !== 4) {
            throw new UserException("Erro: os horários precisam estar no formato HHmm");
        }

        const min = horario.toString().slice(2);
        const hora = horario.toString().slice(0, 2);

        if (parseInt(min) === 0 || parseInt(min) === 15 || parseInt(min) === 30) {
            if (parseInt(hora) > 8 || parseInt(hora) < 19) {
                return true;
            } else {
                throw new UserException("Erro: o consultório funciona apenas entre 8h e 19h");
            }
        }

        throw new UserException("Erro: os horários são definidos de 15 em 15 minutos");
    }

    #calculaTempo(horaInicial, horaFinal) {
        let horaIni = DateTime.fromFormat(horaInicial, "HHmm");
        let horaFin = DateTime.fromFormat(horaFinal, "HHmm");
        let tempo = horaFin.diff(horaIni, ['hours', 'minutes']).toObject();
        let hora;

        if (tempo.hours.toString().length === 1 && tempo.minutes.toString().length === 1) {
            hora = "0" + tempo.hours.toString() + ":" + "0" + tempo.minutes.toString();
        } else if (tempo.hours.toString().length === 2 && tempo.minutes.toString().length === 1){
            hora = tempo.hours.toString() + ":" + "0" + tempo.minutes.toString();
        } else if (tempo.hours.toString().length === 1 && tempo.minutes.toString().length === 2){
            hora = "0" + tempo.hours.toString() + ":" + tempo.minutes.toString();
        } else {
            hora = tempo.hours.toString() + ":" + tempo.minutes.toString();            
        }

        return hora;
    }
}