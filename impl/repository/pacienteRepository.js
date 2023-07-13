import { pacientes } from "../data/pacientes.js";

export default class PacienteRepository {
    pacientesList = pacientes;

    save(paciente) {
        pacientes.push(paciente);
        return true;
    }

    delete(cpf) {
        for (let index = 0; index < pacientes.length; index++) {
            if (pacientes[index].cpf === cpf) {
                pacientes.splice(index, 1);
                return true;
            }
        }

        return "N/A";
    }

    findByCpf(cpf) {
        for (let index = 0; index < pacientes.length; index++) {
            if (pacientes[index].cpf === cpf) {
                return pacientes[index];
            }
        }

        return "N/A";
    }

    getAllCpf() {
        let listCpf = pacientes.sort((a, b) => (a.cpf > b.cpf) ? 1 : -1);

        return listCpf;
    }

    getAllNome() {
        let listNome = pacientes.sort((a, b) => (a.nome > b.nome) ? 1 : -1);

        return listNome;
    }
}