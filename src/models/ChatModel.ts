import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelizeConfig";

class Chat extends Model {}

Chat.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    firstUser: { type: DataTypes.INTEGER, allowNull: false },
    secondUser: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "chat", timestamps: true }
);

export default Chat;
