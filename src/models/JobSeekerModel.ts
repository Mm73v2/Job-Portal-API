import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class JobSeeker extends Model {}

JobSeeker.init(
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    firstName: { type: DataTypes.STRING(50), allowNull: false },
    lastName: { type: DataTypes.STRING(50), allowNull: false },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    age: { type: DataTypes.INTEGER, allowNull: false },
    resume: { type: DataTypes.STRING }, // Resume URL
  },
  {
    sequelize,
    modelName: "jobseeker",
    tableName: "job_seekers",
    timestamps: false,
  }
);

export default JobSeeker;
