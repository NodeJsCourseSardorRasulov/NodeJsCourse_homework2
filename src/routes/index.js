import { UserController } from '../controllers/index.js';
import { GroupController } from '../controllers/index.js';
import { LoginController } from '../controllers/index.js';
import { errorHandlingAndLoggingMiddleware } from '../middlewares/index.js';

export const createRoutes = app => {
  UserController(app);
  GroupController(app);
  LoginController(app);
  app.use(errorHandlingAndLoggingMiddleware);
};
