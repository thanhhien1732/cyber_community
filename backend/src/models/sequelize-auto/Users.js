import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    facebookId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "facebookId"
    },
    googleId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "googleId"
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Users',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "facebookId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facebookId" },
        ]
      },
      {
        name: "googleId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "googleId" },
        ]
      },
      {
        name: "roleId",
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
  }
}
