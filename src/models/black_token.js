"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Black_token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Black_token.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            access_token: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Black_token",
            tableName: "black_tokens",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
    return Black_token
}
