import PromptSync from 'prompt-sync';
import PacienteController from './controller/pacienteController';

const prompt = PromptSync({ sigint: true });

const pacienteController = new PacienteController();

menuPrincipal();

function menuPrincipal() {
    console.log("Menu Principal: ");
    console.log("1-Cadastro de pacientes ");
    console.log("2-Agenda ");
    console.log("3-Fim ");

    let selecaoPrincipal = prompt("");

    if (selecaoPrincipal === "1") {
        menuCadastro();
    } else if (selecaoPrincipal === "2") {
        menuAgenda()
    } else if (selecaoPrincipal === "3") {
        return;
    } else {
        console.log("Selecione uma opção válida do menu: ");
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
        cadastroPaciente();
    } else if (selecaoCadastro === "2") {
        excluiPaciente();
    } else if (selecaoCadastro === "3") {
        listarPacienteCpf();
    } else if (selecaoCadastro === "4") {
        listarPacienteNome();
    } else if (selecaoCadastro === "5") {
        menuPrincipal();
    } else {
        console.log("Selecione uma opção válida do menu: ");
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

    if (selecaoAgenda === "1") {
        //função para agendar consulta
    } else if (selecaoAgenda === "2") {
        //função para cancelar agendamento
    } else if (selecaoAgenda === "3") {
        //função para listar agenda
    } else if (selecaoAgenda === "4") {
        menuPrincipal();
    } else {
        console.log("Selecione uma opção válida do menu: ");
        menuAgenda();
    }
}

function cadastroPaciente() {
    let cpf = prompt("CPF: ");
    let nome = prompt("Nome: ");
    let dataNascimento = prompt("Data de nascimento: ");

    pacienteController.save(cpf, nome, dataNascimento);
}

function excluiPaciente() {
    let cpf = prompt("CPF: ");

    pacienteController.delete(cpf);
}

function listarPacienteCpf() {
    let pacientes = pacienteController.listarCpf();

    //adicionar tela de acordo com enunciado

    console.log(pacientes);
}

function listarPacienteNome() {
    let pacientes = pacienteController.listarNome();

    //adicionar tela de acordo com enunciado

    console.log(pacientes);
}