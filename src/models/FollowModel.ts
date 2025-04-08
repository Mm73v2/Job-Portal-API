import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Follow extends Model {}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: { type: DataTypes.UUID, defaultValue: UUIDV4() },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: "Follow",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

export default Follow;
