import app from './src/server.js';

import { UserController } from './src/controllers/index.js';
import { GroupController } from './src/controllers/index.js';
import { LoginController } from './src/controllers/index.js';
import { errorHandlingAndLoggingMiddleware } from './src/middlewares/index.js';

const startApp = () => {
  UserController(app);
  GroupController(app);
  LoginController(app);
  app.use(errorHandlingAndLoggingMiddleware);
};

startApp();
