import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Roles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
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
    tableName: 'Roles',
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
    ]
  });
  }
}
