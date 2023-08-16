export default class Consulta {
    // Atributos da consulta
    #cpfPaciente;
    #data;
    #horaInicial;
    #horaFinal;

    // Função construtora da consulta
    constructor(cpfPaciente, data, horaInicial, horaFinal) {
        this.#cpfPaciente = cpfPaciente
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
    }

    // Função para recuperar o cpf do paciente atrelado à consulta
    get cpfPaciente() {
        return this.#cpfPaciente;
    }

    // Função para recuperar a data da consulta
    get data() {
        return this.#data;
    }

    // Função para recuperar a hora inicial da consulta
    get horaInicial() {
        return this.#horaInicial;
    }

    // Função para recuperar a hora final da consulta
    get horaFinal() {
        return this.#horaFinal;
    }

    // Função para alterar o cpf do paciente atrelado à consulta
    set cpfPacienteConsulta(cpfPaciente) {
        this.#cpfPaciente = cpfPaciente;
    }

    // Função para alterar a data da consulta
    set dataConsulta(data) {
        this.#data = data;
    }
    
    // Função para alterar a hora inicial da consulta
    set horaInicialConsulta(horaInicial) {
        this.#horaInicial = horaInicial;
    }
    
    // Função para alterar a hora final da consulta
    set horaFinalConsulta(horaFinal) {
        this.#horaFinal = horaFinal;
    }
}