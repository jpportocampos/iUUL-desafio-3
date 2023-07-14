import ConsultaService from "../service/consultaService.js";

export default class ConsultaController {
    #consultaService = new ConsultaService(); // Criação da instância do Service de Consulta

    // Função para salvar os dados de uma consulta
    save(cpf, data, horaInicial, horaFinal) {
        return this.#consultaService.salvar(cpf, data, horaInicial, horaFinal); // Chamada da função de salvar os dados de uma consulta do Service de consulta, retorna true caso ocorra e false caso gere erros
    }

    // Função para deletar os dados de uma consulta
    delete(cpf, data, horaInicial) {
        return this.#consultaService.deletar(cpf, data, horaInicial); // Chamada da função de deletar os dados de uma consulta do Service de consulta, retorna true caso ocorra e false caso gere erros
    }

    // Função para listar os dados da agenda toda
    listarAgendaToda() {
        return this.#consultaService.listarAgendaToda(); // Chamada da função de listar os dados da agenda toda, retorna true caso ocorra e false caso gere erros
    }

    // Função para listar os dados da agenda em um determinado período
    listarAgendaParcial(dataIni, dataFin) {
        return this.#consultaService.listarAgendaParcial(dataIni, dataFin); // Chamada da função de listar os dados da agenda em um determinado período, retorna true caso ocorra e false caso gere erros
    }
}