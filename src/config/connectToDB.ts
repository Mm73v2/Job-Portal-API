import sequelize from "./sequelizeConfig";
import "../models/associations";
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully");

    await sequelize.sync({ force: true }); // This will create the table, dropping it first if it already existed
    console.log("All models were synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectToDB;
