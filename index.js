import app from './src/server.js';

import { UserController } from './src/controllers/index.js';
import { GroupController } from './src/controllers/index.js';

const startApp = () => {
  UserController(app);
  GroupController(app);
};

startApp();
