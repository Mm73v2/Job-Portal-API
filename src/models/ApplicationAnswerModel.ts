import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class ApplicationAnswer extends Model {}

ApplicationAnswer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    applicationId: { type: DataTypes.INTEGER, allowNull: false },
    answerId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "application_answers",
    timestamps: false,
  }
);

export default ApplicationAnswer;
