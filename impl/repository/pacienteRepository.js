export default class PacienteRepository {
    pacientes = [];

    save(paciente) {
        this.pacientes.push(paciente);
    }

    delete(cpf) {
        for (let index = 0; index < this.pacientes.length; index++) {
            if (this.pacientes[index].cpf === cpf) {
                this.pacientes.splice(index, index);
                return true;
            }
        }

        return false;
    }

    findByCpf(cpf) {
        for (let index = 0; index < this.pacientes.length; index++) {
            if (this.pacientes[index].cpf === cpf) {
                return this.pacientes[index];
            }
        }

        return "N/A";
    }
}