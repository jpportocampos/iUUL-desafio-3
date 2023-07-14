import { DateTime } from "luxon";
import ConsultaRepository from "../repository/consultaRepository.js";
import PacienteRepository from "../repository/pacienteRepository.js";
import Consulta from "../entity/consulta.js";

// Função que gera as mensagens customizadas de erro
function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

export default class ConsultaService {
    #consultaRepository = new ConsultaRepository(); // Criação da instância do Repository de Consulta
    #pacienteRepository = new PacienteRepository(); // Criação da instância do Repository de Paciente
    
    // Função para salvar os daddos de uma consulta
    salvar(cpf, data, horaInicial, horaFinal) {
        let paciente = this.#pacienteRepository.findByCpf(cpf); // Recupera o paciente utilizando o cpf com uma função de busca por CPF do repository de paciente
        if (paciente === "N/A") { // Verifica se o paciente está cadastrado
            throw new UserException("Erro: paciente não cadastrado"); // Caso não esteja, gera uma exceção
        }

        this.#validaData(data, horaInicial, paciente); // Chamada da função que valida a data da consulta
        this.#validaHorario(horaInicial); // Chamada da função que valida o horário inicial da função
        this.#validaHorario(horaFinal); // Chamada da função que valida o horário final da consulta

        // Gera uma nova consulta a partir dos dados após as validações
        let consulta = new Consulta(cpf, data, horaInicial, horaFinal);

        return this.#consultaRepository.save(consulta); // Chamada da função de salvar a cosnulta no Repository de Consulta, retorna true caso dê certo e false caso dê erro
    }

    // Função para deletar os dados de uma consulta
    deletar(cpf, data, horaInicial) {
        if (this.#pacienteRepository.findByCpf(cpf) === "N/A") { // Verifica se o paciente está cadastrado através da função de busca por CPf do repository de paciente
            throw new UserException("Erro: paciente não cadastrado"); // Gera uma exceção caso o paciente não esteja cadastrado
        }

        // Chamada da função para deletar a consulta no Repository de Consulta
        return this.#consultaRepository.delete(cpf, data, horaInicial);
    }

    // Função para listar a agenda toda
    listarAgendaToda() {
        let list = this.#consultaRepository.getAll(); // Recebe a lista de todas as consultas através de uma função do repository de consulta

       // Percorre a lista recebida para adicionar os dados extras necessários 
        list.forEach(n => {
            n.tempo = this.#calculaTempo(n.horaInicial, n.horaFinal); // Chamada da função para calcular o tempo total de uma consulta
            n.horaInicialConsulta = DateTime.fromFormat(n.horaInicial, "HHmm").toFormat("HH:mm"); // Formata a hora inicial da consulta
            n.horaFinalConsulta = DateTime.fromFormat(n.horaFinal, "HHmm").toFormat("HH:mm"); // Formata a hora final da consulta
            n.nome = this.#pacienteRepository.findByCpf(n.cpfPaciente).nome; // Recupera o nome do paciente através do cpf usando uma função do repository de paciente
            n.dataNascimento = this.#pacienteRepository.findByCpf(n.cpfPaciente).dataNascimento; // Recupera a data de nascimento do paciente através do cpf usando uma função do repository de paciente
        });

        return list; // Retorna a lista atualizada
    }

    // Função para listar a agenda em um determinado período
    listarAgendaParcial(dataIni, dataFin) {
        let list = this.#consultaRepository.getAll(); // Recebe a lista de todas as consultas através de uma função do repository de consulta
        
        // Transforma as datas inicial e final do período definido em DateTime
        let dataInicial = DateTime.fromFormat(dataIni.toString(), "dd/LL/yyyy");
        let dataFinal = DateTime.fromFormat(dataFin.toString(), "dd/LL/yyyy");

        // Percorre a lista recebida para adicionar os dados extras necessários
        for (let index = 0; index < list.length; index++) {
            let dataConsulta = DateTime.fromFormat(list[index].data, "dd/LL/yyyy"); // Transforma a data da consulta em DateTime
            if (dataConsulta < dataInicial || dataConsulta > dataFinal) { // Caso a data da consulta esteja fora do período determinado, a consulta é excluída da lista
                list.splice(index, 1);
            } else {
                list[index].tempo = this.#calculaTempo(list[index].horaInicial, list[index].horaFinal);  // Chamada da função para calcular o tempo total de uma consulta
                list[index].horaInicialConsulta = DateTime.fromFormat(list[index].horaInicial, "HHmm").toFormat("HH:mm"); // Formata a hora inicial da consulta
                list[index].horaFinalConsulta = DateTime.fromFormat(list[index].horaFinal, "HHmm").toFormat("HH:mm"); // Formata a hora final da consulta
                list[index].nome = this.#pacienteRepository.findByCpf(list[index].cpfPaciente).nome; // Recupera o nome do paciente através do cpf usando uma função do repository de paciente
                list[index].dataNascimento = this.#pacienteRepository.findByCpf(list[index].cpfPaciente).dataNascimento; // Recupera a data de nascimento do paciente através do cpf usando uma função do repository de paciente
            }
        }

        return list; // Retorna a lista atualizada
    }

    // Função para validar a data de uma consulta
    #validaData(data, horaInicial, paciente) {
        if (data[2] !== "/" || data[5] !== "/" || data.length !== 10) { // Verifica a formatação da data
            throw new UserException("Erro: a data precisa estar no formato dd/mm/yyyy"); // Gera uma exceção caso a formatação esteja errada
        }

        // Verifica a formatação do horário inicial
        if (horaInicial.length !== 4) {
            throw new UserException("Erro: os horários precisam estar no formato HHmm"); // Gera uma exceção caso a formatação esteja errada
        }

        // Transforma a data e a hora inicial em DateTime e gera a data atual em DateTime
        let dataCompleta = data + " " + horaInicial;
        let dataConsulta = DateTime.fromFormat(dataCompleta, "dd/LL/yyyy HHmm");
        let dataAtual = DateTime.now();

        // Percorre a lista de consultas para ver se já não existe alguma consulta para este paciente
        for (let index = 0; index < this.#consultaRepository.consultasList.length; index++) {
            let consulta = this.#consultaRepository.findByCpf(paciente.cpf); // Recupera a consulta usando o cpf do paciente
            if (consulta !== "N/A") { // Verifica se o a consulta existe
                // Transforma a consulta recuperada em DateTime
                let dataPaciente = consulta.data + " " + consulta.horaInicial;
                let dataConsultaPaciente = DateTime.fromFormat(dataPaciente, "dd/LL/yyyy HHmm");

                // Verifica se a consulta é futura
                if (dataConsultaPaciente > dataAtual) {
                    throw new UserException("Erro: o paciente já tem uma consulta futura agendada"); // Caso seja, gera uma exceção
                }
            } else {
                break; // Caso o paciente não tenha consultas, quebra o loop
            }
        }

        // Verifica se a data da consulta é futura
        if (dataConsulta > dataAtual) {
            if (this.#consultaRepository.findByData(data, horaInicial) !== "N/A") { // Verifica se já existe uma consulta neste horário recuperando consulta por data no repository de consulta
                throw new UserException("Erro: já existe uma consulta agendada nesse horário"); // Caso já exista, gera uma exceção
            }
            return true; // Retorna true caso esteja tudo certo
        } else {
            throw new UserException("Erro: a data da consulta precisa ser futura em relação a data atual"); // Gera uma exceção caso a data não seja futura
        }
    }

    // Função que valida um horário de uma consulta
    #validaHorario(horario){
        if (horario.length !== 4) { // Verifica a formatação do horário
            throw new UserException("Erro: os horários precisam estar no formato HHmm"); // Gera uma exceção caso a formatação esteja errada
        }

        // Recupera os minutos e as horas do horario e os salva em constantes
        const min = horario.toString().slice(2);
        const hora = horario.toString().slice(0, 2);

        // Verifica se os valores numéricos dos minutos estão dentro da regra
        if (parseInt(min) === 0 || parseInt(min) === 15 || parseInt(min) === 30) {
            if (parseInt(hora) > 8 || parseInt(hora) < 19) { // Verifica se os valores numéricos das horas estão dentro do horário do consultório
                return true; // Retorna true caso esteja tudo certo
            } else {
                throw new UserException("Erro: o consultório funciona apenas entre 8h e 19h"); // Gera uma exceção caso o horário esteja fora do horário do consultório
            }
        }

        throw new UserException("Erro: os horários são definidos de 15 em 15 minutos"); // Gera uma exceção caso os minutos não estejam de acordo com a regra
    }

    // Função para calcular o tempo total de uma consulta
    #calculaTempo(horaInicial, horaFinal) {
        // Transforma os horários em DateTime
        let horaIni = DateTime.fromFormat(horaInicial, "HHmm");
        let horaFin = DateTime.fromFormat(horaFinal, "HHmm");
        let tempo = horaFin.diff(horaIni, ['hours', 'minutes']).toObject(); // Calcula a diferença em horas e minutos do horário
        let hora; // Cria uma variável para depois guardar a diferença formatada corretamente

        // Verificação de formatação, caso a hora ou os minutos sejam de apenas um dígito, deve-se acrescentar 0 na frente
        if (tempo.hours.toString().length === 1 && tempo.minutes.toString().length === 1) {
            hora = "0" + tempo.hours.toString() + ":" + "0" + tempo.minutes.toString();
        } else if (tempo.hours.toString().length === 2 && tempo.minutes.toString().length === 1){
            hora = tempo.hours.toString() + ":" + "0" + tempo.minutes.toString();
        } else if (tempo.hours.toString().length === 1 && tempo.minutes.toString().length === 2){
            hora = "0" + tempo.hours.toString() + ":" + tempo.minutes.toString();
        } else {
            hora = tempo.hours.toString() + ":" + tempo.minutes.toString();            
        }

        return hora; // Retorna a diferença formatada
    }
}