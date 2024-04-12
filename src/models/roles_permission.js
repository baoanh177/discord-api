'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roles_permission.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: DataTypes.INTEGER,
    permission: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Roles_permission',
    tableName: "roles_permissions",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Roles_permission;
};