import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Answer extends Model {}

Answer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    questionId: { type: DataTypes.INTEGER, allowNull: false },
    answerBody: { type: DataTypes.TEXT, allowNull: false },
    isSaved: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "answers",
    timestamps: true,
  }
);

export default Answer;
