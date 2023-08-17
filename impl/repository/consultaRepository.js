import Consultas from "../data/consultas.js";

export default class ConsultaRepository {    
    // Função para salvar uma consulta na lista de consultas
    async save(consulta) {
        await Consultas.create({ cpfPaciente: consulta.cpfPaciente, data: consulta.data, horaInicial: consulta.horaInicial, horaFinal: consulta.horaFinal }); // Usa a função create() do sequelize para adicionar a consulta
        return true;
    }

    // Função para deletar uma consulta da lista de consultas
    async delete(cpf, dataConsulta, hora) {
        try {
            await Consultas.destroy({ // Usa a função destroy() do sequelize para deletar a consulta
                where: {
                    cpfPaciente: cpf,
                    data: dataConsulta,
                    horaInicial: hora
                }
            });
            return true;
        } catch (error) { // Caso ocorra um erro, ele é capturado e a função retorna false
            return false;
        }
    }

    // Função para buscar uma consulta através do CPF do paciente
    async findByCpf(cpf) {
        try {
            const consulta = await Consultas.findAll({ // Usa a função findAll() do sequelize com um where para realizar a busca de uma consulta, retorna uma lista
                where: {
                  cpfPaciente: cpf
                }
              });

              if (consulta.length === 0) { // Caso a lista venha vazia, retorna "N/A", ou seja, não existem consultas nesse cpf
                return "N/A";
              } else {
                return consulta[0]; // Caso não seja vazia, retorna o primeiro elemento
              }
        } catch (error) {
            return "N/A"; // Caso encontre algum erro, retorna "N/A"
        }
    }

    async findAllByCpf(cpf) {
        try {
            const consulta = await Consultas.findAll({  // Usa a função findAll() do sequelize com um where para realizar a busca de uma consulta, retorna uma lista
                where: {
                  cpfPaciente: cpf
                }
              });

              if (consulta.length === 0) {  // Caso a lista venha vazia, retorna "N/A", ou seja, não existem consultas nesse cpf
                return "N/A";
              } else {
                return consulta;  // Caso não seja vazia, retorna a lista
              }
        } catch (error) {
            return "N/A"; // Caso encontre algum erro, retorna "N/A"
        }
    }

    // Função para buscar uma consulta através da data
    async findByData(dataConsulta, hora) {
        try {
            const consulta = await Consultas.findAll({ // Usa a função findAll() do sequelize com um where para realizar a busca de uma consulta, retorna uma lista
                where: {
                  data: dataConsulta,
                  horaInicial: hora
                }
              });

              if (consulta.length === 0) { // Caso a lista venha vazia, retorna "N/A", ou seja, não existem consultas nesta data
                return "N/A";
              } else {
                return consulta[0]; // Caso não seja vazia, retorna o primeiro elemento
              }
        } catch (error) {
            return "N/A"; // Caso encontre algum erro, retorna "N/A"
        }
    }

    // Função que gera uma lista de consultas ordenada por data
    async getAll() {
        const consulta = await Consultas.findAll(); // Usa a função findAll() do sequelize retornar uma lista com todas as consultas do banco
        let list = consulta.sort((a, b) => (a.data > b.data) ? 1 : (a.data === b.data) ? ((a.horaInicial > b.horaInicial) ? 1 : -1) : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo data e armazena em uma outra lista

        return list; // Retorna a lista gerada
    }
}