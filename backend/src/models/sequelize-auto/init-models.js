import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Articles from  "./Articles.js";
import _Permissions from  "./Permissions.js";
import _RolePermission from  "./RolePermission.js";
import _Roles from  "./Roles.js";
import _Users from  "./Users.js";

export default function initModels(sequelize) {
  const Articles = _Articles.init(sequelize, DataTypes);
  const Permissions = _Permissions.init(sequelize, DataTypes);
  const RolePermission = _RolePermission.init(sequelize, DataTypes);
  const Roles = _Roles.init(sequelize, DataTypes);
  const Users = _Users.init(sequelize, DataTypes);

  RolePermission.belongsTo(Permissions, { as: "permission", foreignKey: "permissionId"});
  Permissions.hasMany(RolePermission, { as: "RolePermissions", foreignKey: "permissionId"});
  RolePermission.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(RolePermission, { as: "RolePermissions", foreignKey: "roleId"});
  Users.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "roleId"});

  return {
    Articles,
    Permissions,
    RolePermission,
    Roles,
    Users,
  };
}
