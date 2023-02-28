import { DataTypes } from 'sequelize';

import { groupPermissions } from '../configs/groupPermissions.js';
import { sequelize } from './sequelizeConnected.js';

export const GroupModel = sequelize.define('', {
  id: {
    type: DataTypes.UUID,
    defaultVaue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissions: {
    type: DataTypes.ENUM(groupPermissions)
  }
});
