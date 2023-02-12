import app from './src/server.js';

import { UserController } from './src/controller/index.js';

const startApp = () => {
  UserController(app);
};

startApp();
