import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Application extends Model {}

Application.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    jobId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "reviewed", "rejected", "accepted"),
      allowNull: false,
    },
    appliedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: "application", timestamps: true }
);

export default Application;
