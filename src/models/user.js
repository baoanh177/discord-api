"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Users_server, {
                foreignKey: "user_id"
            })
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            gender: DataTypes.STRING,
            avatar: DataTypes.STRING,
            status: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            verify_code: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
    return User
}
