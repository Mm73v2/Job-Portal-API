import sequelize from "./sequelizeConfig";
import "../models/associations";
import addDefaultRoles from "../services/addDefaultRoles";
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully");

    await sequelize.sync({ force: false }); // This will create the table, dropping it first if it already existed
    await addDefaultRoles();
    console.log("All models were synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectToDB;
