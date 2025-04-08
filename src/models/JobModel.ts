import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Job extends Model {}

Job.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    jobProviderId: { type: DataTypes.UUID, allowNull: false },
    type: {
      type: DataTypes.ENUM("onsite", "remotely", "hybrid"),
      allowNull: false,
    },
    location: { type: DataTypes.STRING },
    salary: { type: DataTypes.DECIMAL(10, 2) },
    status: { type: DataTypes.ENUM("open", "closed"), allowNull: false },
  },
  { sequelize, modelName: "job", timestamps: true }
);

export default Job;
