import { Sequelize } from 'sequelize';

import { dbConnectionConfig } from '../configs/index.js';

export const sequelize = new Sequelize(dbConnectionConfig);
