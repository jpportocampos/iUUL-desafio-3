//import { consultas } from "../data/consultas.js";

export default class ConsultaRepository {
//    consultasList = consultas; // Instância da lista de consultas importada
    
    // Função para salvar uma consulta na lista de consultas
    save(consulta) {
        consultas.push(consulta); // Usa a função push() da lista para adicionar a consulta
        return true;
    }

    // Função para deletar uma consulta da lista de consultas
    delete(cpf, data, horaInicial) {
        // Percorre a lista de consultas buscando por cpf do paciente, data e hora inicial
        for (let index = 0; index < consultas.length; index++) {
            if (consultas[index].cpfPaciente === cpf && consultas[index].data === data && consultas[index].horaInicial === horaInicial) {
                consultas.splice(index, 1); // Deleta a consulta usando a função splice() da lista
                return true; // Retorna true caso haja a deleção
            }
        }

        return false; // Retorna "N/A" caso não encontre o paciente
    }

    // Função para buscar uma consulta através do CPF do paciente
    findByCpf(cpf) {
        // Percorre a lista de consultas buscando por cpf do paciente
        for (let index = 0; index < consultas.length; index++) {
            if (consultas[index].cpfPaciente === cpf) {
                return consultas[index]; // Retorna a consulta encontrada
            }
        }

        return "N/A"; // Retorna "N/A" caso não encontre o paciente
    }

    // Função para buscar uma consulta através da data
    findByData(data, horaInicial) {
        // Percorre a lista de consultas buscando por data e hora inicial
        for (let index = 0; index < consultas.length; index++) {
            if (consultas[index].data === data && consultas[index].horaInicial === horaInicial) {
                return consultas[index]; // Retorna a consulta encontrada
            }
        }

        return "N/A"; // Retorna "N/A" caso não encontre o paciente
    }

    // Função que gera uma lista de consultas ordenada por data
    getAll() {
        let list = consultas.sort((a, b) => (a.data > b.data) ? 1 : (a.data === b.data) ? ((a.horaInicial > b.horaInicial) ? 1 : -1) : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo data e armazena em uma outra lista

        return list; // Retorna a lista gerada
    }
}