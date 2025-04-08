import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Question extends Model {}

Question.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    type: { type: DataTypes.ENUM("standard", "custom"), allowNull: false },
    questionBody: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: "questions",
    timestamps: true,
  }
);

export default Question;
