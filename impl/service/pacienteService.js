import { DateTime } from "luxon";
import PacienteRepository from "../repository/pacienteRepository.js";
import ConsultaRepository from "../repository/consultaRepository.js";
import Paciente from "../entity/paciente.js";

// Função que gera as mensagens customizadas de erro
function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

export default class PacienteService {
    #pacienteRepository = new PacienteRepository(); // Criação da instância do Repository de Paciente
    #consultaRepository = new ConsultaRepository(); // Criação da instância do Repository de Consulta

    // Função para salvar os daddos de um paciente
    async salvar(cpf, nome, dataNascimento) {
        await this.#validaCpf(cpf); // Chamada da função que valida o cpf do paciente
        this.#validaNome(nome); // Chamada da função que valida o nome do paciente
        this.#validaDataNascimento(dataNascimento); // Chamada da função que valida a data de nascimento do paciente

        // Gera um novo paciente a partir dos dados após as validações
        let paciente = new Paciente(cpf, nome, dataNascimento);

        return await this.#pacienteRepository.save(paciente); // Chamada da função de salvar o paciente no Repository de Paciente, retorna true caso dê certo e false caso dê erro
    }

    // Função para deletar os dados de um paciente
    async deletar(cpf) {
        if (this.#validaCadastro(cpf)) { // Valida se o cliente realmente está cadastrado
            throw new UserException("Paciente não cadastrado") // Gera uma exceção caso o paciente não eteja cadastrado
        }

        // Percorre a lista de consultas para verificar a existência de consultas deste paciente
        for (let index = 0; index < this.#consultaRepository.consultasList.length; index++) {
            // Coleta a primeira consulta disponível
            let consulta = this.#consultaRepository.findByCpf(cpf);

            // Caso a coleta traga "N/A" significa que não existem consultas atreladas a este paciente
            // O loop é quebrado
            if (consulta === "N/A") {
                break;
            }

            // Bloco para manipular os dados da consulta coletada para transforma-los em DateTime
            let dataCompleta = consulta.data + " " + consulta.horaInicial;
            let dataConsulta = DateTime.fromFormat(dataCompleta, "dd/LL/yyyy HHmm");
            let dataAtual = DateTime.now();

            // Verifica se a data da consulta é futura
            if (dataConsulta > dataAtual) {
                throw new UserException("Erro: paciente já agendado para consulta futura") // Caso seja, gera uma exceção
            }

            // Chamada da função para deletar a consulta no Repository de Consulta
            this.#consultaRepository.delete(cpf, consulta.data, consulta.horaInicial);
        }

        // Chamada da função para deletar o paciente no Repository de Paciente
        return await this.#pacienteRepository.delete(cpf);
    }

    // Função para listar os dados dos pacientes ordenados por CPF
    async listarCpf() {
        // Coleta no repository de paciente a lista de pacientes ordenada por CPF
        let listCpf = await this.#pacienteRepository.getAllCpf();

        // Chama a função para verificar se há consultas atreladadas a algum paciente e atualiza a lista
        listCpf = this.#getConsulta(listCpf);

        // Percorre a lista para gerar a idade dos pacientes
        listCpf.forEach(n => {
            n.idade = this.#calculaIdade(n.dataNascimento) // Chamada da função que gera a idade dos pacientes
        });

        // Retorna a lista de pacientes ordenados por CPF e com os dados extras necessários
        return listCpf;
    }

    // Função para listar os dados dos pacientes ordenados por nome
    async listarNome() {
        // Coleta no repository de paciente a lista de pacientes ordenada por nome
        let listNome = await this.#pacienteRepository.getAllNome();

        // Chama a função para verificar se há consultas atreladadas a algum paciente e atualiza a lista
        listNome = this.#getConsulta(listNome);

        // Percorre a lista para gerar a idade dos pacientes
        listNome.forEach(n => {
            n.idade = this.#calculaIdade(n.dataNascimento) // Chamada da função que gera a idade dos pacientes
        });

        // Retorna a lista de pacientes ordenados por nome e com os dados extras necessários
        return listNome;
    }

    // Função que faz a validação do CPF do paciente
    async #validaCpf(cpf) {
        if (!await this.#validaCadastro(cpf)) { // Verifica se o paciente já está cadastrado
            throw new UserException("Erro: CPF já cadastrado"); // Gera uma exceção caso o paciente já esteja cadastrado
        }
        // Verifica se o CPF possui a quantidade correta de dígitos
        if (cpf.length === 11) {
            this.#validaDigitosCPF(cpf); // Chamada da função que valida os dígitos do CPF
            this.#validaJ(cpf); // Chamada da função que valida o primeiro dígito verificador do CPF
            this.#validaK(cpf); // Chamada da função que valida o segundo dígito verificador do CPF
        } else {
            throw new UserException("Erro: CPF inválido, precisa ter 11 dígitos"); // Gera uma exceção caso o CPF não possua a quantidade correta de dígitos
        }
    }

    // Função que faz a validação do nome do paciente
    #validaNome(nome) {
        if (nome.length < 5) { // Verifica se o tamanho do nome é válido
            throw new UserException("Erro: nome inválido, precisa ter pelo menos 5 caracteres"); // Gera uma exceção caso o nome seja muito pequeno
        }
    }

    // Função que faz a validação da data de nascimento do paciente
    #validaDataNascimento(dataNascimento) {
        if (dataNascimento[2] !== "/" || dataNascimento[5] !== "/" || dataNascimento.length !== 10) { // Verifica a formatação da data de nascimento
            throw new UserException("Erro: a data precisa estar no formato dd/mm/yyyy"); // Gera uma exceção caso a formatação esteja errada
        }

        // Transforma a data de nascimento em DateTime e gera a data atual também em DateTime
        let data = DateTime.fromFormat(dataNascimento, "dd/LL/yyyy");
        let dataAtual = DateTime.now();

        // Calcula a diferença entre as data geradas e salva em um objeto
        var diffTempo = dataAtual.diff(data, ['months', 'days', 'years']).toObject();

        // Verifica se a diferença em anos gerada é válida
        if (diffTempo.years < 13) {
            throw new UserException("Erro: paciente deve ter pelo menos 13 anos"); // Gera uma exceção caso o paciente seja muito novo
        }
    }

    // Função que faz a validação do cadastro de um paciente
    async #validaCadastro(cpf) {
        if (await this.#pacienteRepository.findByCpf(cpf) === "N/A") { // Recupera o paciente usando o CPF no Repository de paciente e verifica se retornou "N/A"
            return true; // Caso sim, retorna ture, o cpf não é cadastrado
        }

        return false; // Retorna false caso contrário, paciente já cadastrado
    }

    // Função que faz a validação dos dígitos de um CPF
    #validaDigitosCPF(cpf) {
        let digito = cpf[0]; // Guarda o primeiro dígito em uma variável

        // Percorre o cpf
        for (let index = 0; index < cpf.length; index++) {
            if (cpf[index] !== digito) { // Verifica se os dígitos do CPF são diferentes do primeiro
                return true; // Caso sejam, retorna true
            }
        }

        throw new UserException("Erro: CPF inválido, dígitos não podem ser todos iguais"); // Caso sejam todos iguais gera uma exceção
    }

    // Função que valida o primeiro dígito verificador do CPF
    #validaJ(cpf) {
        const j = cpf.toString()[9]; // Salva o dígito verificador em uma costante

        // Salva os dígitos anteriores ao 1º DV do CPF em constantes
        const a = cpf.toString()[0];
        const b = cpf.toString()[1];
        const c = cpf.toString()[2];
        const d = cpf.toString()[3];
        const e = cpf.toString()[4];
        const f = cpf.toString()[5];
        const g = cpf.toString()[6];
        const h = cpf.toString()[7];
        const i = cpf.toString()[8];

        // Garantindo que os dígitos serão tratados como números, faz a soma do cálculo do 1º DV e salva em uma variável
        let soma = (10 * parseInt(a)) + (9 * parseInt(b)) + (8 * parseInt(c)) + (7 * parseInt(d)) + (6 * parseInt(e)) + (5 * parseInt(f)) + (4 * parseInt(g)) + (3 * parseInt(h)) + (2 * parseInt(i));

        // Salva o resto da soma por 11 em uma variável
        let resto = soma % 11;

        if (resto === 0 || resto === 1) { // Verifica se o resto é igual a 0 ou 1
            if (parseInt(j) !== 0) {
                throw new UserException("Erro: CPF inválido, 1º dígito verificador não é válido"); // Gera uma exceção caso o 1º DV seja diferente de 0 com o resto sendo 0 ou 1
            } else {
                return true; // Retorna true caso o 1º DV seja 0
            }
        } else if (resto >= 2 && resto <= 10) { // Verifica se o resto está entre 2 e 10
            if (parseInt(j) !== (11 - resto)) {
                throw new UserException("Erro: CPF inválido, 1º dígito verificador não é válido"); // Gera uma exceção caso o 1º DV seja diferente de 11 - resto com o resto estando entre 2 e 10
            } else {
                return true; // Retorna true caso o 1º DV seja 11 - resto
            }
        }

        return false; // Retorna false caso o resto seja maior do que 10
    }

    // Função que valida o segundo dígito verificador do CPF
    #validaK(cpf) {
        const k = cpf.toString()[10]; // Salva o dígito verificador em uma costante

        // Salva os demais dígitos do CPF em constantes
        const a = cpf.toString()[0];
        const b = cpf.toString()[1];
        const c = cpf.toString()[2];
        const d = cpf.toString()[3];
        const e = cpf.toString()[4];
        const f = cpf.toString()[5];
        const g = cpf.toString()[6];
        const h = cpf.toString()[7];
        const i = cpf.toString()[8];
        const j = cpf.toString()[9];

        // Garantindo que os dígitos serão tratados como números, faz a soma do cálculo do 2º DV e salva em uma variável
        let soma = (11 * parseInt(a)) + (10 * parseInt(b)) + (9 * parseInt(c)) + (8 * parseInt(d)) + (7 * parseInt(e)) + (6 * parseInt(f)) + (5 * parseInt(g)) + (4 * parseInt(h)) + (3 * parseInt(i)) + (2 * parseInt(j));

        // Salva o resto da soma por 11 em uma variável
        let resto = soma % 11;

        if (resto === 0 || resto === 1) { // Verifica se o resto é igual a 0 ou 1
            if (parseInt(k) !== 0) {
                throw new UserException("Erro: CPF inválido, 2º dígito verificador não é válido"); // Gera uma exceção caso o 2º DV seja diferente de 0 com o resto sendo 0 ou 1
            } else {
                return true; // Retorna true caso o 2º DV seja 0
            }
        } else if (resto >= 2 && resto <= 10) { // Verifica se o resto está entre 2 e 10
            if (parseInt(k) !== (11 - resto)) {
                throw new UserException("Erro: CPF inválido, 2º dígito verificador não é válido"); // Gera uma exceção caso o 2º DV seja diferente de 11 - resto com o resto estando entre 2 e 10
            } else {
                return true; // Retorna true caso o 1º DV seja 11 - resto
            }
        }

        return false; // Retorna false caso o resto seja maior do que 10
    }

    // Função para calcular a idade de um paciente
    #calculaIdade(dataNascimento) {
        // Transforma a data de nascimento em DateTime e gera a data atual também em DateTime
        let data = DateTime.fromFormat(dataNascimento, "dd/LL/yyyy");
        let dataAtual = DateTime.now();
    
        // Calcula a diferença entre as data geradas e salva em um objeto
        var diffTempo = dataAtual.diff(data, ['months', 'days', 'years']).toObject();
    
        return diffTempo.years // Retorna a diferença em anos
    }

    // Função para verificar se há consultas atreladadas a algum paciente 
    #getConsulta(list) {
        // Percorre a lista de pacientes recebida
        for (let index = 0; index < list.length; index++) {
            let consulta = this.#consultaRepository.findByCpf(list[index].cpf); // Recebe a consulta através do CPF usando uma função do Repository de consulta
            if (consulta !== "N/A") { // Verifica se a consulta existe
                // Caso sim, formata os dados e os adiciona no objeto da lista
                list[index].dataConsulta = "Agendado para: " + consulta.data;
                list[index].horaConsulta = consulta.horaInicial + " às " + consulta.horaFinal;
            }
        }

        return list; // Retorna a lista atualizada
    }
}