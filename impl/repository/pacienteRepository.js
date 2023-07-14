import { pacientes } from "../data/pacientes.js";

export default class PacienteRepository {
    pacientesList = pacientes; // Instância da lista de pacientes importada

    // Função para salvar um paciente na lista de pacientes
    save(paciente) {
        pacientes.push(paciente); // Usa a função push() da lista para adicionar o paciente
        return true;
    }

    // Função para deletar um paciente da lista de pacientes
    delete(cpf) {
        // Percorre a lista de pacientes buscando por cpf
        for (let index = 0; index < pacientes.length; index++) {
            if (pacientes[index].cpf === cpf) {
                pacientes.splice(index, 1); // Deleta o paciente usando a função splice() da lista
                return true; // Retorna true caso haja a deleção
            }
        }

        return "N/A"; // Retorna "N/A" caso não encontre o paciente
    }

    // Função para buscar um paciente através do CPF
    findByCpf(cpf) {
        // Percorre a lista de pacientes buscando por cpf
        for (let index = 0; index < pacientes.length; index++) {
            if (pacientes[index].cpf === cpf) {
                return pacientes[index]; // Retorna o paciente encontrado
            }
        }

        return "N/A"; // Retorna "N/A" caso não encontre o paciente
    }

    // Função que gera uma lista de pacientes ordenada por CPF
    getAllCpf() {
        let listCpf = pacientes.sort((a, b) => (a.cpf > b.cpf) ? 1 : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo CPF e armazena em uma outra lista

        return listCpf; // Retorna a lista gerada
    }

    // Função que gera uma lista de pacientes ordenada por nome
    getAllNome() {
        let listNome = pacientes.sort((a, b) => (a.nome > b.nome) ? 1 : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo nome e armazena em uma outra lista

        return listNome; // Retorna a lista gerada
    }
}