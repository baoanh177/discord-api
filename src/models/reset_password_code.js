"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Reset_password_code extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Reset_password_code.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: DataTypes.STRING,
            reset_code: DataTypes.INTEGER,
            expired: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Reset_password_code",
            tableName: "reset_password_codes",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
    return Reset_password_code
}
