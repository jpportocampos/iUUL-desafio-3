import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://postgres:pass123@localhost:5432/consultorio');