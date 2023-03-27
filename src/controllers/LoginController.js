import { UserModel } from '../models/index.js';
import { UserService } from '../services/index.js';
import { routesConfig } from '../configs/index.js';

const { loginRoutesPathname } = routesConfig;

const userService = new UserService(UserModel);

export const LoginController = app => {
  app.post(loginRoutesPathname, async (req, res) => {
    const { username, password } = req.body;

    console.log('req', req.body);

    const token = await userService.login(username, password);

    if (!token) {
      res.send({
        success: false,
        message: 'Username and/or password is incorrect'
      });
    }

    res.send({
      success: true,
      token
    });
  });
};
