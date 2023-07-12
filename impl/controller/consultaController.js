import ConsultaService from "../service/consultaService";

export default class ConsultaController {
    #consultaService = new ConsultaService();

    save(cpf, data, horaInicial, horaFinal) {
        if (this.#consultaService.salvar(cpf, data, horaInicial, horaFinal)) {
            return true;
        }

        return false;
    }

    delete(cpf, data, horaInicial) {
        if (this.#consultaService.deletar(cpf, data, horaInicial)) {
            return true;
        }

        return false;
    }

    listarAgenda() {
        return this.#consultaService.listarAgenda();
    }
}