function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

export default class Paciente {
    #cpf;
    #nome;
    #dataNascimento;

    constructor(cpf, nome, dataNascimento) {
        if (this.#validaCpf(cpf)) {
            this.#cpf = cpf;
        }
        if (this.#validaNome(nome)) {
            this.#nome = nome;
        }
        if (this.#validaDataNascimento(dataNascimento)) {
            this.#dataNascimento = dataNascimento;
        }
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

    #validaCpf(cpf) {
        return true;
    }

    #validaNome(nome) {
        if (nome.length < 5) {
            throw new UserException("CPF inválido");
        }

        return true;
    }

    #validaDataNascimento(dataNascimento) {
        return true;
    }
}