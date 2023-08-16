import Consultas from "../data/consultas.js";

export default class ConsultaRepository {    
    // Função para salvar uma consulta na lista de consultas
    async save(consulta) {
        await Consultas.create({ cpfPaciente: consulta.cpfPaciente, data: consulta.data, horaInicial: consulta.horaInicial, horaFinal: consulta.horaFinal }); // Usa a função push() da lista para adicionar a consulta
        return true;
    }

    // Função para deletar uma consulta da lista de consultas
    async delete(cpf, dataConsulta, hora) {
        try {
            await Consultas.destroy({
                where: {
                    cpfPaciente: cpf,
                    data: dataConsulta,
                    horaInicial: hora
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Função para buscar uma consulta através do CPF do paciente
    async findByCpf(cpf) {
        try {
            const consulta = await Consultas.findAll({
                where: {
                  cpfPaciente: cpf
                }
              });

              if (consulta.length === 0) {
                return "N/A";
              } else {
                return paciente[0];
              }
        } catch (error) {
            return "N/A";   
        }
    }

    async findAllByCpf(cpf) {
        try {
            const consulta = await Consultas.findAll({
                where: {
                  cpfPaciente: cpf
                }
              });

              if (consulta.length === 0) {
                return "N/A";
              } else {
                return paciente;
              }
        } catch (error) {
            return "N/A";   
        }
    }

    // Função para buscar uma consulta através da data
    async findByData(dataConsulta, hora) {
        try {
            const consulta = await Consultas.findAll({
                where: {
                  data: dataConsulta,
                  horaInicial: hora
                }
              });

              if (consulta.length === 0) {
                return "N/A";
              } else {
                return paciente[0];
              }
        } catch (error) {
            return "N/A";   
        }
    }

    // Função que gera uma lista de consultas ordenada por data
    async getAll() {
        const consulta = await Consultas.findAll();
        let list = consulta.sort((a, b) => (a.data > b.data) ? 1 : (a.data === b.data) ? ((a.horaInicial > b.horaInicial) ? 1 : -1) : -1); // Usando a função sort() da lista, gera uma lista ordenada pelo atributo data e armazena em uma outra lista

        return list; // Retorna a lista gerada
    }
}