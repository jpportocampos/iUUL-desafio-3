import PacienteService from "../service/pacienteService";

export default class PacienteController {
    #pacienteService = new PacienteService();

    save(cpf, nome, dataNascimento) {
        if (this.#pacienteService.salvar(cpf, nome, dataNascimento)) {
            return true;
        }

        return false;
    }

    delete(cpf) {
        if (this.#pacienteService.deletar(cpf)) {
            return true;
        }

        return false;
    }

    listarCpf() {
        return this.#pacienteService.listarCpf();
    }

    listarNome() {
        return this.#pacienteService.listarNome();
    }
}