export default class Paciente {
    // Atributos do paciente
    #cpf;
    #nome;
    #dataNascimento;

    // Função construtora do paciente
    constructor(cpf, nome, dataNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
    }

    // Função para recuperar o cpf do paciente
    get cpf() {
        return this.#cpf;
    }

    // Função para recuperar o nome do paciente
    get nome() {
        return this.#nome;
    }

    // Função para recuperar a data de nascimento do paciente
    get dataNascimento() {
        return this.#dataNascimento;
    }

    // Função para alterar o cpf do paciente
    set cpfPaciente(cpf) {
        this.#cpf = cpf;
    }

    // Função para alterar o nome do paciente
    set nomePaciente(nome) {
        this.#nome = nome;
    }

    // Função para alterar a data de nascimento do paciente
    set dataNascimentoPaciente(dataNascimento) {
        this.#dataNascimento = dataNascimento;
    }
}