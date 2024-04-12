'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servers_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Servers_role.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    server_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Servers_role',
    tableName: "servers_roles",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Server_role;
};