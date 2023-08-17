import Pacientes from "../data/pacientes.js";

export default class PacienteRepository {
    // Função para salvar um paciente na lista de pacientes
    async save(paciente) {
        await Pacientes.create({ cpf: paciente.cpf, nome: paciente.nome, dataNascimento: paciente.dataNascimento }); // Usa a função create() do sequelize para adicionar um paciente ao banco
        return true;
    }

    // Função para deletar um paciente da lista de pacientes
    async delete(cpfPaciente) {
        try {
            await Pacientes.destroy({ // Usa a função destroy() do sequelize para deletar o paciente do banco
                where: {
                  cpf: cpfPaciente
                }
              });
            return true;            
        } catch (error) { // Caso ocorra um erro, ele é capturado e a função retorna false
            return false;
        }
    }

    // Função para buscar um paciente através do CPF
    async findByCpf(cpfPaciente) {
        try {
            const paciente = await Pacientes.findAll({ // Usa a função findAll() do sequelize com um where para realizar a busca de um paciente, retorna uma lista
                where: {
                  cpf: cpfPaciente
                }
              });

              if (paciente.length === 0) { // Caso a lista venha vazia, retorna "N/A"
                return "N/A";
              } else {
                return paciente[0]; // Caso não venha vazia, retorna o primeiro elemento da lista
              }
        } catch (error) { // Caso ocorra um erro, retorna "N/A"
            return "N/A"   
        }
    }

    // Função que gera uma lista de pacientes ordenada por CPF
    async getAllCpf() {
        const paciente = await Pacientes.findAll(); // Usa a função findAll() do sequelize para retornar uma lista com todos os pacientes do banco
        let listCpf = paciente.sort((a, b) => (a.cpf > b.cpf) ? 1 : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo CPF e armazena em uma outra lista

        return listCpf; // Retorna a lista gerada
    }

    // Função que gera uma lista de pacientes ordenada por nome
    async getAllNome() {
        const paciente = await Pacientes.findAll(); // Usa a função findAll() do sequelize para retornar uma lista com todos os pacientes do banco
        let listNome = paciente.sort((a, b) => (a.nome > b.nome) ? 1 : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo nome e armazena em uma outra lista

        return listNome; // Retorna a lista gerada
    }
}