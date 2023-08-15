import Pacientes from "../data/pacientes.js";

export default class PacienteRepository {
    // Função para salvar um paciente na lista de pacientes
    async save(paciente) {
        await Pacientes.create({ cpf: paciente.cpf, nome: paciente.nome, dataNascimento: paciente.dataNascimento });
        return true;
    }

    // Função para deletar um paciente da lista de pacientes
    async delete(cpfPaciente) {
        await Pacientes.destroy({
            where: {
              cpf: cpfPaciente
            }
          });
    }

    // Função para buscar um paciente através do CPF
    async findByCpf(cpfPaciente) {
        try {
            const paciente = await Pacientes.findAll({
                where: {
                  cpf: cpfPaciente
                }
              });

              return paciente[0];
        } catch (error) {
            return "N/A"   
        }
    }

    // Função que gera uma lista de pacientes ordenada por CPF
    async getAllCpf() {
        const paciente = await Pacientes.findAll();
        let listCpf = paciente.sort((a, b) => (a.cpf > b.cpf) ? 1 : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo CPF e armazena em uma outra lista

        return listCpf; // Retorna a lista gerada
    }

    // Função que gera uma lista de pacientes ordenada por nome
    async getAllNome() {
        const paciente = await Pacientes.findAll();
        let listNome = paciente.sort((a, b) => (a.nome > b.nome) ? 1 : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo nome e armazena em uma outra lista

        return listNome; // Retorna a lista gerada
    }
}