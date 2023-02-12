import { DataTypes } from 'sequelize';

import { sequelize } from './sequelizeConnected.js';

const modelOptions = {
  paranoid: true,
  deletedAt: 'isDeleted'
};

export const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, modelOptions);
