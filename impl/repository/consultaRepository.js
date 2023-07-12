export default class ConsultaRepository {
    consultas = [];

    save(consulta) {
        this.consultas.push(consulta);
    }

    delete(cpf, data, horaInicial) {
        for (let index = 0; index < this.consultas.length; index++) {
            if (this.consultas[index].cpfPaciente === cpf && this.consultas[index].data === data && this.consultas[index].horaInicial === horaInicial) {
                this.consultas.splice(index, index);
                return true;
            }
        }

        return false;
    }

    findByCpf(cpf) {
        for (let index = 0; index < this.consultas.length; index++) {
            if (this.consultas[index].cpfPaciente === cpf) {
                return true;
            }
        }

        return false;
    }

    getAll() {
        list = this.consultas.sort((a, b) => (a.data > b.data) ? 1 : (a.data === b.data) ? ((a.horaInicial > b.horaInicial) ? 1 : -1) : -1);

        return listCpf;
    }
}