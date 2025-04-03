import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class JobQuestion extends Model {}

JobQuestion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "JobQuestion",
    tableName: "job_questions",
  }
);

export default JobQuestion;
