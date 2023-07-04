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
        if (cpf.length === 11) {
            this.#validaDigitosCPF(cpf);
        } else {
            throw new UserException("CPF inválido (precisa ter 11 dígitos)");
        }
    }

    #validaNome(nome) {
        if (nome.length < 5) {
            throw new UserException("Nome inválido (precisa ter 5 dígitos)");
        }

        return true;
    }

    #validaDataNascimento(dataNascimento) {
        return true;
    }

    #validaDigitosCPF(cpf) {
        let digito = cpf.toString()[0];
        
        cpf.toString().forEach(n => {
            if(n !== digito) {
                return true;
            }
        });

        throw new UserException("CPF inválido (caracteres iguais)");
    }
}