import ConsultaService from "../service/consultaService.js";

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

    listarAgendaToda() {
        return this.#consultaService.listarAgendaToda();
    }

    listarAgendaParcial(dataIni, dataFin) {
        return this.#consultaService.listarAgendaParcial(dataIni, dataFin);
    }
}