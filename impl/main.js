import PromptSync from 'prompt-sync';
import { sequelize } from './utils/database.js';
import PacienteController from './controller/pacienteController.js';
import ConsultaController from './controller/consultaController.js';
import Pacientes from './data/pacientes.js';
import Consultas from './data/consultas.js';

const prompt = PromptSync({ sigint: true }); // Criação do leitor de entradas do console

const pacienteController = new PacienteController(); // Criação da instância do Controller de Paciente
const consultaController = new ConsultaController(); // Criação da instância do Controller de Consulta

// Bloco try catch para a conexão com o banco
try {
    await sequelize.authenticate(); // autentica com o banco através da constante 'sequelize' importada de ../utils, alterar a constante para conectar com um banco diferente do selecionado
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

// Inicia as instâncias dos Models do sequelize
await Pacientes.init(sequelize);
await Consultas.init(sequelize);

await sequelize.sync(); // Sincroniza com o banco de dados

await menuPrincipal(); // Chamada da função que inicia o Menu Principal

// Função que inicia o Menu Principal
async function menuPrincipal() {
    // Bloco que imprime no console as opções do Menu Principal
    for (;;) {
        console.log("Menu Principal: ");
        console.log("1-Cadastro de pacientes ");
        console.log("2-Agenda ");
        console.log("3-Fim ");

        // Variável que recebe a próxima entrada do console
        let selecaoPrincipal = prompt("");

        // Validações de entrada
        if (selecaoPrincipal === "1") {
            console.log(" ");
            await menuCadastro(); // Chamada da função que inicia o Menu de Cadastro
        } else if (selecaoPrincipal === "2") {
            console.log(" ");
            await menuAgenda(); // Chamada da função que inicia o Menu de Agenda
        } else if (selecaoPrincipal === "3") {
            break; // Finaliza a aplicação
        } else {
            // Caso a entrada seja inválida, imprime a mensagem e chama a função do Menu Principal novamente
            console.log(" ");
            console.log("Selecione uma opção válida do menu: ");
            console.log(" ");
        }
    }
}

// Função que inicia o Menu de Cadastro
async function menuCadastro() {
    // Bloco que imprime no console as opções do Menu de Cadastro
    for (;;) {
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
            await cadastroPaciente(); // Chamada da função que inicia o cadastro de um paciente
        } else if (selecaoCadastro === "2") {
            console.log(" ");
            await excluiPaciente(); // Chamada da função que inicia a exclusão de um paciente
        } else if (selecaoCadastro === "3") {
            console.log(" ");
            await listarPacienteCpf(); // Chamada da função que inicia a listagem de pacientes ordenados por cpf
        } else if (selecaoCadastro === "4") {
            console.log(" ");
            await listarPacienteNome(); // Chamada da função que inicia a listagem de pacientes ordenados por nome
        } else if (selecaoCadastro === "5") {
            console.log(" ");
            await menuPrincipal(); // Chamada da função que retorna para o Menu Principal
        } else {
            // Caso a entrada seja inválida, imprime a mensagem e chama a função do Menu de Cadastro novamente
            console.log(" ");
            console.log("Selecione uma opção válida do menu: ");
            console.log(" ");
        }
    }
}

// Função que inicia o Menu de Agenda
async function menuAgenda() {
    // Bloco que imprime no console as opções do Menu de Agenda
    for(;;) {
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
        await agendaConsulta(); // Chamada da função que inicia o cadastro de uma consulta
    } else if (selecaoAgenda === "2") {
        console.log(" ");
        await cancelaConsulta(); // Chamada da função que inicia o cancelamento de uma consulta
    } else if (selecaoAgenda === "3") {
        console.log(" ");
        await listarAgenda(); // Chamada da função que inicia a listagem da agenda
    } else if (selecaoAgenda === "4") {
        console.log(" ");
        await menuPrincipal(); // Chamada da função que retorna para o Menu Principal
    } else {
        // Caso a entrada seja inválida, imprime a mensagem e chama a função do Menu de Cadastro novamente
        console.log(" ");
        console.log("Selecione uma opção válida do menu: ");
        console.log(" ");
    }
    }
}

// Função que inicia o cadastro de um paciente
async function cadastroPaciente() {
    for(;;) {
        // Inicialização das variáveis através de entradas no console
        let cpf = prompt("CPF: ");
        let nome = prompt("Nome: ");
        let dataNascimento = prompt("Data de nascimento: ");
        console.log(" ");

        // Bloco try catch para garantir que a aplicação não finalize depois de gerar uma exceção
        try {
            if (await pacienteController.save(cpf, nome, dataNascimento)) { // Chamada da função do Controller de paciente para salvar um paciente
                console.log("Paciente cadastrado com sucesso!"); // Imprime a mensagem de sucesso
                console.log(" ");
                await menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de cadastro
            }
        }
        catch (err) { // Caso uma exceção seja lançada, coleta a mensagem
            console.log(err); // Imprime a mensagem da exceção
            console.log(" ");
        }
    }
}

// Função que inicia a exclusão de um paciente
async function excluiPaciente() {
    for(;;) {
        // Inicialização das variáveis através de entradas no console
        let cpf = prompt("CPF: ");
        console.log(" ");
    
        // Bloco try catch para garantir que a aplicação não finalize depois de gerar uma exceção
        try {
            if (await pacienteController.delete(cpf)) { // Chamada da função do Controller de paciente para deletar um paciente
                console.log("Paciente excluído com sucesso!"); // Imprime a mensagem de sucesso
                console.log(" ");
                await menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de exclusão
            }
        }
        catch (err) { // Caso uma exceção seja lançada, coleta a mensagem
            console.log(err); // Imprime a mensagem da exceção
            console.log(" ");
        }
    }
}

// Função que inicia a listagem de pacientes ordenados por cpf
async function listarPacienteCpf() {
    // Coleta a lista de pacientes em uma variável através da função de listar por CPF do Controller de paciente
    let pacientes = await pacienteController.listarCpf();

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
    await menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de listagem
}

// Função que inicia a listagem de pacientes ordenados por nome
async function listarPacienteNome() {
    // Coleta a lista de pacientes em uma variável através da função de listar por Nome do Controller de paciente
    let pacientes = await pacienteController.listarNome();

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
    await menuCadastro(); // Chamada do Menu de Cadastro novamente ao final do processo de listagem
}

// Função que inicia o agendamento de uma consulta
async function agendaConsulta() {
    for(;;) {
        // Inicialização das variáveis através de entradas no console
        let cpf = prompt("CPF: ");
        let data = prompt("Data da consulta: ");
        let horaInicial = prompt("Hora inicial: ");
        let horaFinal = prompt("Hora final: ");
    
        // Bloco try catch para garantir que a aplicação não finalize depois de gerar uma exceção
        try {
            if (await consultaController.save(cpf, data, horaInicial, horaFinal)) { // Chamada da função do Controller de consulta para salvar uma consulta
                console.log("Agendamento realizado com sucesso!"); // Imprime a mensagem de sucesso
                console.log(" ");
                await menuAgenda(); // Chamada do Menu de Agenda novamente ao final do processo de cadastro
            }
        }
        catch (err) { // Caso uma exceção seja lançada, coleta a mensagem
            console.log(err); // Imprime a mensagem da exceção
            console.log(" ");
        }
    }
}

// Função que inicia o cancelamento de uma consulta
async function cancelaConsulta() {
    for(;;) {
        // Inicialização das variáveis através de entradas no console
        let cpf = prompt("CPF: ");
        let data = prompt("Data da consulta: ");
        let horaInicial = prompt("Hora inicial: ");
    
        // Bloco try catch para garantir que a aplicação não finalize depois de gerar uma exceção
        try {
            if (await consultaController.delete(cpf, data, horaInicial)) { // Chamada da função do Controller de consulta para excluir uma consulta
                console.log("Agendamento cancelado com sucesso!"); // Imprime a mensagem de sucesso
                console.log(" ");
                await menuAgenda(); // Chamada do Menu de Agenda novamente ao final do processo de cancelamento
            }
        }
        catch (err) { // Caso uma exceção seja lançada, coleta a mensagem
            console.log(err); // Imprime a mensagem da exceção
            console.log(" ");
        }
    }
}

// Função que inicia a listagem da agenda
async function listarAgenda() {
    for(;;) {
        // Inicialização das variáveis através de entradas no console
        let tipoLista = prompt("Apresentar a agenda T-Toda ou P-Periodo: ");
    
        // Validações de entrada
        if (tipoLista === "T") {
            console.log(" ");
            await listarAgendaT(); // Chamada da função que inicia a listagem total da agenda
        } else if (tipoLista === "P") {
            console.log(" ");
            await listarAgendaP(); // Chamada da funçaõ que inicia a listagem parcial da agenda
        } else {
            // Caso a entrada seja inválida, imprime a mensagem e chama a função de lsitar agenda novamente
            console.log(" ");
            console.log("Selecione uma opção válida do menu: ");
            console.log(" ");
        }
    }
}

// Função que inicia o processo e listar a agenda total
async function listarAgendaT() {
    // Coleta a lista de consultas em uma variável através da função de listar agenda toda do Controller de consulta
    let consultas = await consultaController.listarAgendaToda();

    // Bloco que imprime o layout de listagem
    console.log("------------------------------------------------------------");
    console.log("Data       H.ini H.fim Tempo Nome                  Dt.Nasc.");
    console.log("------------------------------------------------------------");
    consultas.forEach(n => { // Percorre a lista coletada 
        console.log(n.data + " " + n.horaInicial + " " + n.horaFinal + " " + n.tempo + " " + n.nome + "         " + n.dataNascimento); // Imprime os dados
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    await menuAgenda(); // Chamada do Menu de Agenda novamente ao final do processo de listagem
}

async function listarAgendaP() {
    // Inicialização das variáveis através de entradas no console
    let dataIni = prompt("Data inicial: ");
    let dataFin = prompt("Data final: ");

    // Coleta a lista de consultas em uma variável através da função de listar agenda toda do Controller de consulta
    let consultas = await consultaController.listarAgendaParcial(dataIni, dataFin);

    // Bloco que imprime o layout de listagem
    console.log("------------------------------------------------------------");
    console.log("Data       H.ini H.fim Tempo Nome                  Dt.Nasc.");
    console.log("------------------------------------------------------------");
    consultas.forEach(n => { // Percorre a lista coletada 
        console.log(n.data + " " + n.horaInicial + " " + n.horaFinal + " " + n.tempo + " " + n.nome + "         " + n.dataNascimento); // Imprime os dados
    });
    console.log("------------------------------------------------------------");
    console.log(" ");
    await menuAgenda(); // Chamada do Menu de Agenda novamente ao final do processo de listagem
}