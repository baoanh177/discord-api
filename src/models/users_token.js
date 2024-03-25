"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Users_token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Users_token.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            refresh_token: DataTypes.STRING,
            expired: DataTypes.DATE
        },
        {
            sequelize,
            modelName: "Users_token",
            tableName: "users_tokens",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
    return Users_token
}
