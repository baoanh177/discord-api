"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Server.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    },
    {
      sequelize,
      modelName: "Server",
      tableName: "servers",
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );
  return Server;
};
