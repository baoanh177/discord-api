'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channels_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Channels_role.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    channel_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Channels_role',
    tableName: "channels_roles",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Channels_role;
};