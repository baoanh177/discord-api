'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Channel.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    server_id: DataTypes.INTEGER,
    channel_type_id: DataTypes.INTEGER,
    channel_category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Channel',
    tableName: "channels",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Channel;
};