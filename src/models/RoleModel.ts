import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Role",
    timestamps: true,
  }
);

export default Role;
