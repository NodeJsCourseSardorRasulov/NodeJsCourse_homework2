import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(() => console.log('Unable to connect to database'));
