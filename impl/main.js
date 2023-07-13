import PromptSync from 'prompt-sync';
import PacienteController from './controller/pacienteController.js';
import ConsultaController from './controller/consultaController.js';

const prompt = PromptSync({ sigint: true }); // Criação do leitor de entradas do consolo

const pacienteController = new PacienteController(); // Criação da instância do Controller de Paciente
const consultaController = new ConsultaController(); // Criação da instância do Controller de Consulta

menuPrincipal(); // Chamada da função que inicia o Menu Principal

// Função que inicia o Menu Principal
function menuPrincipal() {
    // Bloco que imprime no console as opções do Menu Principal
    console.log("Menu Principal: ");
    console.log("1-Cadastro de pacientes ");
    console.log("2-Agenda ");
    console.log("3-Fim ");

    // Variável que recebe a próxima entrada do console
    let selecaoPrincipal = prompt("");

    // Validações de entrada
    if (selecaoPrincipal === "1") {
        console.log(" ");
        menuCadastro(); // Chamada da função que inicia o Menu de Cadastro
    } else if (selecaoPrincipal === "2") {
        console.log(" ");
        menuAgenda() // Chamada da função que inicia o Menu de Agenda
    } else if (selecaoPrincipal === "3") {
        return; // Finaliza a aplicação
    } else {
        // Caso a entrada seja inválida, imprime a mensagem e chama a função do Menu Principal novamente
        console.log(" ");
        console.log("Selecione uma opção válida do menu: ");
        console.log(" ");
        menuPrincipal();
    }
}

// Função que inicia o Menu de Cadastro
function menuCadastro() {
    // Bloco que imprime no console as opções do Menu de Cadastro
    console.log("Menu do Cadastro de Pacientes: ");
    console.log("1-Cadastrar novo paciente ");
    console.log("2-Excluir paciente ");
    console.log("3-Listar pacientes (ordenado por CPF) ");
    console.log("4-Listar pacientes (ordenado por nome) ");
    console.log("5-Voltar p/ menu principal ");

    // Variável que recebe a próxima entrada do console
    let selecaoCadastro = prompt("");

    // Validações de entrada
    if (selecaoCadastro === "1") {
        console.log(" ");
        cadastroPaciente(); // Chamada da função que inicia o cadastro de um paciente
    } else if (selecaoCadastro === "2") {
        console.log(" ");
        excluiPaciente(); // Chamada da função que inicia a exclusão de um paciente
    } else if (selecaoCadastro === "3") {
        console.log(" ");
        listarPacienteCpf(); // Chamada da função que inicia a listagem de pacientes ordenados por cpf
    } else if (selecaoCadastro === "4") {
        console.log(" ");
        listarPacienteNome(); // Chamada da função que inicia a listagem de pacientes ordenados por nome
    } else if (selecaoCadastro === "5") {
        console.log(" ");
        menuPrincipal(); // Chamada da função que retorna para o Menu Principal
    } else {
        // Caso a entrada seja inválida, imprime a mensagem e chama a função do Menu de Cadastro novamente
        console.log(" ");
        console.log("Selecione uma opção válida do menu: ");
        console.log(" ");
        menuCadastro();
    }
}

// Função que inicia o Menu de Agenda
function menuAgenda() {
    // Bloco que imprime no console as opções do Menu de Agenda
    console.log("Agenda: ");
    console.log("1-Agendar consulta ");
    console.log("2-Cancelar agendamento ");
    console.log("3-Listar agenda ");
    console.log("4-Voltar p/ menu principal ");

    // Variável que recebe a próxima entrada do console
    let selecaoAgenda = prompt("");

    // Validações de entrada
    if (selecaoAgenda === "1") {
        console.log(" ");
        agendaConsulta(); // Chamada da função que inicia o cadastro de uma consulta
    } else if (selecaoAgenda === "2") {
        console.log(" ");
        cancelaConsulta(); // Chamada da função que inicia o cancelamento de uma consulta
    } else if (selecaoAgenda === "3") {
        console.log(" ");
        listarAgenda(); // Chamada da função que inicia a listagem da agenda
    } else if (selecaoAgenda === "4") {
        console.log(" ");
        menuPrincipal(); // Chamada da função que retorna para o Menu Principal
    } else {
        // Caso a entrada seja inválida, imprime a mensagem e chama a função do Menu de Cadastro novamente
        console.log(" ");
        console.log("Selecione uma opção válida do menu: ");
        console.log(" ");
        menuAgenda();
    }
}

// Função que inicia o cadastro de um paciente
function cadastroPaciente() {
    // Inicialização das variáveis através de entradas no console
    let cpf = prompt("CPF: ");
    let nome = prompt("Nome: ");
    let dataNascimento = prompt("Data de nascimento: ");
    console.log(" ");

    // Bloco try catch para garantir que a aplicação não finalize depois de gerar uma exceção
    try {
        if (pacienteController.save(cpf, nome, dataNascimento)) { // Chamada da função do Controller de paciente para salvar um paciente
            console.log("Paciente cadastrado com sucesso!"); // Imprime a mensagem de sucesso
            console.log(" ");
            menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de cadastro
        }
    }
    catch (err) { // Caso uma exceção seja lançada, coleta a mensagem
        console.log(err); // Imprime a mensagem da exceção
        console.log(" ");
        cadastroPaciente(); // Chama novamente a função de cadastro de paciente para uma nova tentativa
    }
}

// Função que inicia a exclusão de um paciente
function excluiPaciente() {
    // Inicialização das variáveis através de entradas no console
    let cpf = prompt("CPF: ");
    console.log(" ");

    // Bloco try catch para garantir que a aplicação não finalize depois de gerar uma exceção
    try {
        if (pacienteController.delete(cpf)) { // Chamada da função do Controller de paciente para deletar um paciente
            console.log("Paciente excluído com sucesso!"); // Imprime a mensagem de sucesso
            console.log(" ");
            menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de exclusão
        }
    }
    catch (err) { // Caso uma exceção seja lançada, coleta a mensagem
        console.log(err); // Imprime a mensagem da exceção
        console.log(" ");
        excluiPaciente(); // Chama novamente a função de exclusão de paciente para uma nova tentativa
    }
}

// Função que inicia a listagem de pacientes ordenados por cpf
function listarPacienteCpf() {
    // Coleta a lista de pacientes em uma variável através da função de listar por CPF do Controller de paciente
    let pacientes = pacienteController.listarCpf();

    // Bloco que imprime o layout de listagem
    console.log("------------------------------------------------------------");
    console.log("CPF         Nome               Dt.Nasc.                Idade");
    console.log("------------------------------------------------------------");
    pacientes.forEach(n => { // Percorre a lista coletada 
        console.log(n.cpf + " " + n.nome + "         " + n.dataNascimento + "                " + n.idade); // Imprime os dados básicos
        if (n.dataConsulta !== undefined) { // Se houver, imprime os dados da consulta
            console.log("            " + n.dataConsulta);
            console.log("            " + n.horaConsulta);
        }
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de listagem
}

// Função que inicia a listagem de pacientes ordenados por nome
function listarPacienteNome() {
    // Coleta a lista de pacientes em uma variável através da função de listar por Nome do Controller de paciente
    let pacientes = pacienteController.listarNome();

    // Bloco que imprime o layout de listagem
    console.log("------------------------------------------------------------");
    console.log("CPF         Nome               Dt.Nasc.                Idade");
    console.log("------------------------------------------------------------");
    pacientes.forEach(n => { // Percorre a lista coletada 
        console.log(n.cpf + " " + n.nome + "         " + n.dataNascimento + "                " + n.idade); // Imprime os dados básicos
        if (n.dataConsulta !== undefined) { // Se houver, imprime os dados da consulta
            console.log("            " + n.dataConsulta);
            console.log("            " + n.horaConsulta);
        }
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de listagem
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