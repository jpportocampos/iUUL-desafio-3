export default class Consulta {
    #cpfPaciente;
    #data;
    #horaInicial;
    #horaFinal;

    constructor(cpfPaciente, data, horaInicial, horaFinal) {
        if (this.#validaCpfPaciente(cpfPaciente)) {
            this.#cpfPaciente = cpfPaciente;
        }
        if (this.#validaData(data)) {
            this.#data = data;
        }
        if (this.#validaHoraInicial(horaInicial)) {
            this.#horaInicial = horaInicial;
        }
        if (this.#validaHoraFinal(horaFinal)) {
            this.#horaFinal = horaFinal;
        }
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

    #validaCpfPaciente(cpfPaciente) {
        return true
    }
    
    #validaData(data) {
        return true
    }
    
    #validaHoraInicial(horaInicial) {
        return true
    }
    
    #validaHoraFinal(horaFinal) {
        return true
    }
}