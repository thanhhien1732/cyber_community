import { DataTypes } from "sequelize";
import sequelize from "../../common/sequelize/init.sequelize";

// CODE FIRST: Code để tạo ra model và áp vào database
// Code => Database
const Role = sequelize.define(
    "Role", // tên sử dụng nội bộ trong code
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(255)
        },

        description: {
            type: DataTypes.STRING(255)
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },

        deletedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        isDeleted: {
            type: DataTypes.BOOLEAN, // 0: false | 1: true
            allowNull: false,
            defaultValue: 0
        },

        deletedAt: {
            type: "TIMESTAMP",
            allowNull: true,
            defaultValue: null
        },

        createdAt: {
            type: "TIMESTAMP",
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        },

        updatedAt: {
            type: "TIMESTAMP",
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
        }
    },
    {
        tableName: "Roles", // tên table trong database
        timestamps: false // default: true, sequelize tự quản lý | false: mình quản lý
    }
)

Role.sync({ alter: false })

export default Role


// DATABASE FIRST: Tạo Database trước rồi mới kèo vào code
// Database => Code | dùng thư viện sequelize - auto kéo vào Code

// sequelize-auto -h <host> -d <database> -u <user> -x [password] - p [port] --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName]

// npx sequelize - auto - h localhost - d db_cyber_community - u root - x 1234 - p 3307  --dialect mysql - o src\models\sequelize - auto - l esm
