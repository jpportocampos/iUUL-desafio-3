import PromptSync from 'prompt-sync';
import PacienteController from './controller/pacienteController.js';
import ConsultaController from './controller/consultaController.js';

const prompt = PromptSync({ sigint: true });

const pacienteController = new PacienteController();
const consultaController = new ConsultaController();

menuPrincipal();

function menuPrincipal() {
    console.log("Menu Principal: ");
    console.log("1-Cadastro de pacientes ");
    console.log("2-Agenda ");
    console.log("3-Fim ");

    let selecaoPrincipal = prompt("");

    if (selecaoPrincipal === "1") {
        console.log(" ");
        menuCadastro();
    } else if (selecaoPrincipal === "2") {
        console.log(" ");
        menuAgenda()
    } else if (selecaoPrincipal === "3") {
        return;
    } else {
        console.log(" ");
        console.log("Selecione uma opção válida do menu: ");
        console.log(" ");
        menuPrincipal();
    }
}

function menuCadastro() {
    console.log("Menu do Cadastro de Pacientes: ");
    console.log("1-Cadastrar novo paciente ");
    console.log("2-Excluir paciente ");
    console.log("3-Listar pacientes (ordenado por CPF) ");
    console.log("4-Listar pacientes (ordenado por nome) ");
    console.log("5-Voltar p/ menu principal ");

    let selecaoCadastro = prompt("");

    if (selecaoCadastro === "1") {
        console.log(" ");
        cadastroPaciente();
    } else if (selecaoCadastro === "2") {
        console.log(" ");
        excluiPaciente();
    } else if (selecaoCadastro === "3") {
        console.log(" ");
        listarPacienteCpf();
    } else if (selecaoCadastro === "4") {
        console.log(" ");
        listarPacienteNome();
    } else if (selecaoCadastro === "5") {
        console.log(" ");
        menuPrincipal();
    } else {
        console.log(" ");
        console.log("Selecione uma opção válida do menu: ");
        console.log(" ");
        menuCadastro();
    }
}

function menuAgenda() {
    console.log("Agenda: ");
    console.log("1-Agendar consulta ");
    console.log("2-Cancelar agendamento ");
    console.log("3-Listar agenda ");
    console.log("4-Voltar p/ menu principal ");

    let selecaoAgenda = prompt("");
    console.log(" ");

    if (selecaoAgenda === "1") {
        console.log(" ");
        agendaConsulta();
    } else if (selecaoAgenda === "2") {
        console.log(" ");
        cancelaConsulta();
    } else if (selecaoAgenda === "3") {
        console.log(" ");
        listarAgenda();
    } else if (selecaoAgenda === "4") {
        console.log(" ");
        menuPrincipal();
    } else {
        console.log(" ");
        console.log("Selecione uma opção válida do menu: ");
        console.log(" ");
        menuAgenda();
    }
}

function cadastroPaciente() {
    let cpf = prompt("CPF: ");
    let nome = prompt("Nome: ");
    let dataNascimento = prompt("Data de nascimento: ");
    console.log(" ");

    try {
        if (pacienteController.save(cpf, nome, dataNascimento)) {
            console.log("Paciente cadastrado com sucesso!");
            console.log(" ");
            menuCadastro();
        }
      }
    catch (err) {
        console.log(err);
            console.log(" ");
            cadastroPaciente();
    }
}

function excluiPaciente() {
    let cpf = prompt("CPF: ");
    console.log(" ");

    
    try {
        if (pacienteController.delete(cpf)) {
            console.log("Paciente excluído com sucesso!");
            console.log(" ");
            menuCadastro();
        }
      }
    catch (err) {
        console.log(err);
            console.log(" ");
            excluiPaciente();
    }
}

function listarPacienteCpf() {
    let pacientes = pacienteController.listarCpf();

    console.log("------------------------------------------------------------");
    console.log("CPF         Nome               Dt.Nasc.                Idade");
    console.log("------------------------------------------------------------");
    pacientes.forEach(n => {
        console.log(n.cpf + " " + n.nome + "         " + n.dataNascimento + "                " + n.idade);
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    menuCadastro();
}

function listarPacienteNome() {
    let pacientes = pacienteController.listarNome();

    console.log("------------------------------------------------------------");
    console.log("CPF         Nome               Dt.Nasc.                Idade");
    console.log("------------------------------------------------------------");
    pacientes.forEach(n => {
        console.log(n.cpf + " " + n.nome + "         " + n.dataNascimento + "                " + n.idade);
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    menuCadastro();
}

function agendaConsulta() {
    let cpf = prompt("CPF: ");
    let data = prompt("Data da consulta: ");
    let horaInicial = prompt("Hora inicial: ");
    let horaFinal = prompt("Hora final: ");

    try {
        if (consultaController.save(cpf, data, horaInicial, horaFinal)) {
            console.log("Agendamento realizado com sucesso!");
            console.log(" ");
            menuAgenda();
        }
      }
    catch (err) {
        console.log(err);
            console.log(" ");
            agendaConsulta();
    }
}

function cancelaConsulta() {
    let cpf = prompt("CPF: ");
    let data = prompt("Data da consulta: ");
    let horaInicial = prompt("Hora inicial: ");

    try {
        if (consultaController.delete(cpf, data, horaInicial)) {
            console.log("Agendamento cancelado com sucesso!");
            console.log(" ");
            menuAgenda();
        }
      }
    catch (err) {
        console.log(err);
            console.log(" ");
            cancelaConsulta();
    }
}

function listarAgenda() {
    let tipoLista = prompt("Apresentar a agenda T-Toda ou P-Periodo: ");

    if (tipoLista === "T") {
        console.log(" ");
        listarAgendaT();
    } else if (tipoLista === "P") {
        console.log(" ");
        listarAgendaP();
    } else {
        console.log(" ");
        console.log("Selecione uma opção válida: ");
        console.log(" ");
        listarAgenda();
    }
}

function listarAgendaT() {
    let consultas = consultaController.listarAgendaToda();

    console.log("------------------------------------------------------------");
    console.log("Data       H.ini H.fim Tempo Nome                  Dt.Nasc.");
    console.log("------------------------------------------------------------");
    consultas.forEach(n => {
        console.log(n.data + " " + n.horaInicial + " " + n.horaFinal + " " + n.tempo + " " + n.nome + "         " + n.dataNascimento);
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    menuAgenda();
}

function listarAgendaP() {
    let dataIni = prompt("Data inicial: ");
    let dataFin = prompt("Data final: ");

    let consultas = consultaController.listarAgendaParcial(dataIni, dataFin);

    console.log("------------------------------------------------------------");
    console.log("Data       H.ini H.fim Tempo Nome                  Dt.Nasc.");
    console.log("------------------------------------------------------------");
    consultas.forEach(n => {
        console.log(n.data + " " + n.horaInicial + " " + n.horaFinal + " " + n.tempo + " " + n.nome + "         " + n.dataNascimento);
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    menuAgenda();
}