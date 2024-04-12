'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servers_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Servers_user.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    server_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Servers_user',
    tableName: "servers_users",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Servers_user;
};