import { DateTime } from "luxon";
import PacienteRepository from "../repository/pacienteRepository.js";
import ConsultaRepository from "../repository/consultaRepository.js";
import Paciente from "../entity/paciente.js";

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

export default class PacienteService {
    #pacienteRepository = new PacienteRepository();
    #consultaRepository = new ConsultaRepository();

    salvar(cpf, nome, dataNascimento) {
        this.#validaCpf(cpf);
        this.#validaNome(nome);
        this.#validaDataNascimento(dataNascimento);

        let paciente = new Paciente(cpf, nome, dataNascimento);

        this.#pacienteRepository.save(paciente);

        return true;
    }

    deletar(cpf) {
        if (this.#validaCadastro(cpf)) {
            throw new UserException("Paciente não cadastrado")
        }

        for (let index = 0; index < this.#consultaRepository.consultasList.length; index++) {
            let consulta = this.#consultaRepository.findByCpf(cpf);

            if (consulta === "N/A") {
                break;
            }

            let dataCompleta = consulta.data + " " + consulta.horaInicial;
            let dataConsulta = DateTime.fromFormat(dataCompleta, "dd/LL/yyyy HHmm");
            let dataAtual = DateTime.now();

            if (dataConsulta > dataAtual) {
                throw new UserException("Erro: paciente já agendado para consulta futura")
            }

            this.#consultaRepository.delete(cpf, consulta.data, consulta.horaInicial);
        }

        return this.#pacienteRepository.delete(cpf);
    }

    listarCpf() {
        let listCpf = this.#pacienteRepository.getAllCpf();

        listCpf = this.#getConsulta(listCpf);

        listCpf.forEach(n => {
            n.idade = this.#calculaIdade(n.dataNascimento)
        });

        return listCpf;
    }

    listarNome() {
        let listNome = this.#pacienteRepository.getAllNome();

        listNome = this.#getConsulta(listNome);

        listNome.forEach(n => {
            n.idade = this.#calculaIdade(n.dataNascimento)
        });

        return listNome;
    }

    #validaCpf(cpf) {
        if (!this.#validaCadastro(cpf)) {
            throw new UserException("Erro: CPF já cadastrado");
        }
        if (cpf.length === 11) {
            this.#validaDigitosCPF(cpf);
            this.#validaJ(cpf);
            this.#validaK(cpf);
        } else {
            throw new UserException("Erro: CPF inválido, precisa ter 11 dígitos");
        }
    }

    #validaNome(nome) {
        if (nome.length < 5) {
            throw new UserException("Erro: nome inválido, precisa ter pelo menos 5 caracteres");
        }

        return true;
    }

    #validaDataNascimento(dataNascimento) {
        if (dataNascimento[2] !== "/" || dataNascimento[5] !== "/" || dataNascimento.length !== 10) {
            throw new UserException("Erro: a data precisa estar no formato dd/mm/yyyy");
        }

        let data = DateTime.fromFormat(dataNascimento, "dd/LL/yyyy");
        let dataAtual = DateTime.now();

        var diffTempo = dataAtual.diff(data, ['months', 'days', 'years']).toObject();

        if (diffTempo.years < 13) {
            throw new UserException("Erro: paciente deve ter pelo menos 13 anos");
        }

        return true;
    }

    #validaCadastro(cpf) {
        if (this.#pacienteRepository.findByCpf(cpf) === "N/A") {
            return true;
        }

        return false;
    }

    #validaDigitosCPF(cpf) {
        let digito = cpf[0];

        for (let index = 0; index < cpf.length; index++) {
            if (cpf[index] !== digito) {
                return true;
            }
        }

        throw new UserException("Erro: CPF inválido, dígitos não podem ser todos iguais");
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
                throw new UserException("Erro: CPF inválido, 1º dígito verificador não é válido");
            } else {
                return true;
            }
        } else if (resto >= 2 && resto <= 10) {
            if (parseInt(j) !== (11 - resto)) {
                throw new UserException("Erro: CPF inválido, 1º dígito verificador não é válido");
            } else {
                return false;
            }
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
                throw new UserException("Erro: CPF inválido, 2º dígito verificador não é válido");
            } else {
                return true;
            }
        } else if (resto >= 2 && resto <= 10) {
            if (parseInt(k) !== (11 - resto)) {
                throw new UserException("Erro: CPF inválido, 2º dígito verificador não é válido");
            } else {
                return true;
            }
        }

        return false;
    }

    #calculaIdade(dataNascimento) {
        let data = DateTime.fromFormat(dataNascimento, "dd/LL/yyyy");
        let dataAtual = DateTime.now();
    
        var diffTempo = dataAtual.diff(data, ['months', 'days', 'years']).toObject();
    
        return diffTempo.years
    }

    #getConsulta(list) {
        for (let index = 0; index < list.length; index++) {
            let consulta = this.#consultaRepository.findByCpf(list[index].cpf);
            if (consulta !== "N/A") {
                list[index].dataConsulta = "Agendado para: " + consulta.data;
                list[index].horaConsulta = consulta.horaInicial + " às " + consulta.horaFinal;
            }
        }

        return list;
    }
}