import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Notification extends Model {}

Notification.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    from: { type: DataTypes.INTEGER, allowNull: false }, // Sender
    read: { type: DataTypes.BOOLEAN, defaultValue: false },
    sourceId: { type: DataTypes.INTEGER, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

export default Notification;
