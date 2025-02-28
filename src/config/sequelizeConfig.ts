import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const sequelize = new Sequelize(
  DATABASE_NAME as string,
  DATABASE_USER as string,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: "mysql",
    logging: false, // Disable logging; default: console.log
  }
);

export default sequelize;
