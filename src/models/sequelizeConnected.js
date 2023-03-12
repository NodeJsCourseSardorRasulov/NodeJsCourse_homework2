import { Sequelize } from 'sequelize';

import { dbConnectionConfig } from '../configs/index.js';

export const sequelize = new Sequelize(dbConnectionConfig);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(() => console.log('Unable to connect to database'));
