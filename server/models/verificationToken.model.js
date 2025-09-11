import sequelize from "./db";
import { DataType } from "sequelize"

const VerificationToken = sequelize.define("verificationToken", {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type:DataType.INTEGER,
        allowNull: false,
        referance: {
            model: "users",
            key: "id",
        }
    },
    expiresAt:{
        type: DataType.DATE,
        allowNull: false
    }
});

export default VerificationToken;