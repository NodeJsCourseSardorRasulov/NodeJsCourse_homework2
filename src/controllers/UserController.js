import { useMiddlewareValidator } from '../validation/index.js';
import { UserService } from '../services/index.js';
import { UserModel } from '../models/index.js';
import { routesConfig } from '../configs/index.js';

const { userRoutesPathname } = routesConfig;

const userModel = new UserModel();
const userService = new UserService(userModel);

export const UserController = app => {
  app.get(`${userRoutesPathname}/:loginSubstring?/:limit?`, async (req, res) => {
    const { loginSubstring, limit } = req.params || {};

    const users = await userService.getAll(loginSubstring, limit);

    res.status(200).send(users);
  });

  app.post(`${userRoutesPathname}/`, useMiddlewareValidator, async (req, res) => {
    const user = req.body;

    const newUser = await userService.create(user);

    res.status(201).send(newUser);
  });

  app.put(`${userRoutesPathname}/userId`, async (req, res) => {
    const { userId } = req.params;
    const updatingUser = req.body;

    const updatedUser = await userService.update(updatingUser, userId);

    res.status(201).send(updatedUser);
  });

  app.delete(`${userRoutesPathname}/userId`, async (req, res) => {
    const { userId } = req.params;

    const result = await userService.softDelete(userId);

    if (result) {
      res.status(200).send('File deleted');
    } else {
      res.status(400).end();
    }
  });
};
