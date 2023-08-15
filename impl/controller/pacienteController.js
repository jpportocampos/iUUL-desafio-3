import PacienteService from "../service/pacienteService.js";

export default class PacienteController {
    #pacienteService = new PacienteService(); // Criação da instância do Service de Paciente

    // Função para salvar os dados de um paciente
    async save(cpf, nome, dataNascimento) {
        return await this.#pacienteService.salvar(cpf, nome, dataNascimento); // Chamada da função de salvar os dados de um paciente do Service de paciente, retorna true caso ocorra e false caso gere erros
    }

    // Função para deletar os dados de um paciente
    async delete(cpf) {
        return await this.#pacienteService.deletar(cpf); // Chamada da função de deletar os dados de um paciente do Service de paciente, retorna true caso ocorra e false caso gere erros
    }

    // Função para listar os dados dos pacientes ordenados por CPF
    async listarCpf() {
        return await this.#pacienteService.listarCpf(); // Chamada da função de listar os dados dos pacientes ordenados por CPF, retorna true caso ocorra e false caso gere erros
    }

    // Função para listar os dados dos pacientes ordenados por nome
    async listarNome() {
        return await this.#pacienteService.listarNome(); // Chamada da função de listar os dados dos pacientes ordenados por nome, retorna true caso ocorra e false caso gere erros
    }
}