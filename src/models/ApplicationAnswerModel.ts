import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class ApplicationAnswer extends Model {}

ApplicationAnswer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    applicationId: { type: DataTypes.INTEGER, allowNull: false },
    answerId: { type: DataTypes.INTEGER, allowNull: true },
    questionId: { type: DataTypes.INTEGER, allowNull: false },
    customAnswer: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "applicationanswer",
    tableName: "application_answers",
    timestamps: true,
  }
);

export default ApplicationAnswer;
