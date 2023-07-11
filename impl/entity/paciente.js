export default class Paciente {
    #cpf;
    #nome;
    #dataNascimento;

    constructor(cpf, nome, dataNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
    }

    get cpf() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set cpfPaciente(cpf) {
        this.#cpf = cpf;
    }

    set nomePaciente(nome) {
        this.#nome = nome;
    }

    set dataNascimentoPaciente(dataNascimento) {
        this.#dataNascimento = dataNascimento;
    }
}