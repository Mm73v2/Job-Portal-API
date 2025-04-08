import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class JobQuestion extends Model {}

JobQuestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "jobquestion",
    tableName: "job_questions",
    timestamps: true,
  }
);

export default JobQuestion;
