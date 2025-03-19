import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class SavedJob extends Model {}

SavedJob.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    jobId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "saved_jobs",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
  }
);

export default SavedJob;
