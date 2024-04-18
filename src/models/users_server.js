'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_server extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users_server.belongsTo(models.User, {
        foreignKey: "user_id"
      })

      Users_server.belongsTo(models.Server, {
        foreignKey: "server_id"
      })
    }
  }
  Users_server.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    server_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Users_server',
    tableName: "users_servers",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Users_server;
};