import { userMiddlewareValidator } from '../validation/index.js';
import { UserService } from '../services/index.js';
import { UserModel } from '../models/index.js';
import { routesConfig } from '../configs/index.js';
import { attachServiceInfoToResponse, asyncHandler } from '../helpers/index.js';
import { authMiddleware } from '../middlewares/index.js';

const { userRoutesPathname } = routesConfig;

const userService = new UserService(UserModel);

export const UserController = app => {
  app.use(userRoutesPathname, authMiddleware);

  app.get(`${userRoutesPathname}/:loginSubstring?/:limit?`, asyncHandler(async (req, res) => {
    const { loginSubstring, limit } = req.params || {};

    const users = await userService.getAll(loginSubstring, limit);

    attachServiceInfoToResponse(res, UserService, userService.getAll, [loginSubstring, limit]);
    res.status(200).send(users);
  }));

  app.post(`${userRoutesPathname}/`, userMiddlewareValidator, asyncHandler(async (req, res) => {
    const user = req.body;

    const newUser = await userService.create(user);

    attachServiceInfoToResponse(res, UserService, userService.create, [user]);
    res.status(201).send(newUser);
  }));

  app.put(`${userRoutesPathname}/:userId`, userMiddlewareValidator, asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const updatingUser = req.body;

    await userService.update(updatingUser, userId);

    attachServiceInfoToResponse(res, UserService, userService.update, [updatingUser, userId]);
    res.status(201).send('User updated');
  }));

  app.delete(`${userRoutesPathname}/:userId`, asyncHandler(async (req, res) => {
    const { userId } = req.params;

    await userService.softDelete(userId);

    attachServiceInfoToResponse(res, UserService, userService.softDelete, [userId]);
    res.status(200).send('User deleted');
  }));
};
