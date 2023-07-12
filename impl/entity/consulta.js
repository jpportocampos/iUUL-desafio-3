export default class Consulta {
    #cpfPaciente;
    #data;
    #horaInicial;
    #horaFinal;

    constructor(cpfPaciente, data, horaInicial, horaFinal) {
        this.#cpfPaciente = cpfPaciente
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
    }

    get cpfPaciente() {
        return this.#cpfPaciente;
    }

    get data() {
        return this.#data;
    }

    get horaInicial() {
        return this.#horaInicial;
    }

    get horaFinal() {
        return this.#horaFinal;
    }

    set cpfPacienteConsulta(cpfPaciente) {
        this.#cpfPaciente = cpfPaciente;
    }

    set dataConsulta(data) {
        this.#data = data;
    }
    
    set horaInicialConsulta(horaInicial) {
        this.#horaInicial = horaInicial;
    }
    
    set horaFinalConsulta(horaFinal) {
        this.#horaFinal = horaFinal;
    }
}