import Paciente from "../entity/paciente.js";

export async function insert(paciente) {
    await Paciente.create({ cpf: paciente.cpf, nome: paciente.nome, dataNascimento: paciente.dataNascimento });
}