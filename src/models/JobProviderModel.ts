import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class JobProvider extends Model {}

JobProvider.init(
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    companyName: { type: DataTypes.STRING(100), allowNull: false },
    establishedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "jobprovider",
    tableName: "job_providers",
    timestamps: false,
  }
);

export default JobProvider;
