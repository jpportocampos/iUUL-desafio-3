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
            this.#validaJ(cpf);
            this.#validaK(cpf);
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

    #validaJ(cpf) {
        const j = cpf.toString()[9];

        const a = cpf.toString()[0];
        const b = cpf.toString()[1];
        const c = cpf.toString()[2];
        const d = cpf.toString()[3];
        const e = cpf.toString()[4];
        const f = cpf.toString()[5];
        const g = cpf.toString()[6];
        const h = cpf.toString()[7];
        const i = cpf.toString()[8];

        let soma = (10 * parseInt(a)) + (9 * parseInt(b)) + (8 * parseInt(c)) + (7 * parseInt(d)) + (6 * parseInt(e)) + (5 * parseInt(f)) + (4 * parseInt(g)) + (3 * parseInt(h)) + (2 * parseInt(i));

        let resto = soma % 11;

        if (resto === 0 || resto === 1) {
            if (parseInt(j) !== 0) {
                throw new UserException("CPF inválido (1º dígito verificador não é válido)");
            }
        } else if (resto >= 2 && resto <= 10) {
            if (parseInt(j) !== (11 - resto)) {
                throw new UserException("CPF inválido (1º dígito verificador não é válido)");
            }
        } else {
            throw new UserException("CPF inválido (1º dígito verificador não é válido)");
        }

        return true;
    }

    #validaK(cpf) {
        const k = cpf.toString()[10];

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

        let soma = (11 * parseInt(a)) + (10 * parseInt(b)) + (9 * parseInt(c)) + (8 * parseInt(d)) + (7 * parseInt(e)) + (6 * parseInt(f)) + (5 * parseInt(g)) + (4 * parseInt(h)) + (3 * parseInt(i)) + (2 * parseInt(j));

        let resto = soma % 11;

        if (resto === 0 || resto === 1) {
            if (parseInt(k) !== 0) {
                throw new UserException("CPF inválido (2º dígito verificador não é válido)");
            }
        } else if (resto >= 2 && resto <= 10) {
            if (parseInt(k) !== (11 - resto)) {
                throw new UserException("CPF inválido (2º dígito verificador não é válido)");
            }
        } else {
            throw new UserException("CPF inválido (1º dígito verificador não é válido)");
        }

        return true;
    }
}