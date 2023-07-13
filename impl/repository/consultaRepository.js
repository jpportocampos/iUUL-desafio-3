import { consultas } from "../data/consultas.js";

export default class ConsultaRepository {
    consultasList = consultas;
    
    save(consulta) {
        consultas.push(consulta);
        return true;
    }

    delete(cpf, data, horaInicial) {
        for (let index = 0; index < consultas.length; index++) {
            if (consultas[index].cpfPaciente === cpf && consultas[index].data === data && consultas[index].horaInicial === horaInicial) {
                consultas.splice(index, 1);
                return true;
            }
        }

        return false;
    }

    findByCpf(cpf) {
        for (let index = 0; index < consultas.length; index++) {
            if (consultas[index].cpfPaciente === cpf) {
                return consultas[index];
            }
        }

        return "N/A";
    }

    findByData(data, horaInicial) {
        for (let index = 0; index < consultas.length; index++) {
            if (consultas[index].data === data && consultas[index].horaInicial === horaInicial) {
                return consultas[index];
            }
        }

        return "N/A";
    }

    getAll() {
        let list = consultas.sort((a, b) => (a.data > b.data) ? 1 : (a.data === b.data) ? ((a.horaInicial > b.horaInicial) ? 1 : -1) : -1);

        return list;
    }
}