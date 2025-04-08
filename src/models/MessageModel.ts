import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Message extends Model {}

Message.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    chatId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: "message",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

export default Message;
