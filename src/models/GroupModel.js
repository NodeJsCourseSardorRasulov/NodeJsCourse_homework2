import { DataTypes } from 'sequelize';

import { groupPermissions } from '../configs/groupPermissions.js';
import { sequelize } from './sequelizeConnected.js';
import { UserModel } from './UserModel.js';

export const GroupModel = sequelize.define('Group', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissions: {
    type: DataTypes.ENUM(groupPermissions),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
});

GroupModel.belongsToMany(UserModel, { through: 'UserGroups' });
