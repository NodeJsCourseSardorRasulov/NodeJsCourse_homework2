import { groupMiddlewareValidator } from '../../validation/index.js';
import { GroupService } from '../../services/index.js';
import { GroupModel, UserModel } from '../../models/index.js';
import { routesConfig } from '../../configs/index.js';
import { groupPermMiddleware, authMiddleware } from '../../middlewares/index.js';
import { attachServiceInfoToResponse } from '../../helpers/index.js';

const { groupRoutesPathname } = routesConfig;

const groupService = new GroupService(GroupModel, UserModel);
const groupMiddlewares = [groupMiddlewareValidator, groupPermMiddleware];

export const GroupController = app => {
  app.use(groupRoutesPathname, authMiddleware);

  app.get(`${groupRoutesPathname}/:limit?`, async (req, res) => {
    const { limit } = req.params || {};

    const groups = await groupService.getAll(limit);

    attachServiceInfoToResponse(res, GroupService, groupService.getAll, [limit]);
    res.status(200).send(groups);
  });

  app.post(`${groupRoutesPathname}/addUserToGroup`, async (req, res) => {
    const { groupId, userId } = req.body;

    const result = await groupService.addUsersToGroup(groupId, userId);

    attachServiceInfoToResponse(res, GroupService, groupService.addUsersToGroup, [groupId, userId]);

    if (result) {
      res.status(201).send({
        success: true,
        message: 'User successfully added to group'
      });
    } else {
      res.send({
        success: false,
        message: 'User wasn\'t added to a group'
      });
    }
  });

  app.post(`${groupRoutesPathname}/`, ...groupMiddlewares, async (req, res) => {
    const group = req.body;

    const newGroup = await groupService.create(group);

    attachServiceInfoToResponse(res, GroupService, groupService.create, [group]);
    res.status(201).send(newGroup);
  });

  app.put(`${groupRoutesPathname}/:groupId`, ...groupMiddlewares, async (req, res) => {
    const { groupId } = req.params;
    const updatingGroup = req.body;

    await groupService.update(updatingGroup, groupId);

    attachServiceInfoToResponse(res, GroupService, groupService.update, [updatingGroup, groupId]);
    res.status(200).send({
      success: true,
      message: 'Group updated'
    });
  });

  app.delete(`${groupRoutesPathname}/:groupId`, async (req, res) => {
    const { groupId } = req.params;

    await groupService.hardDelete(groupId);

    attachServiceInfoToResponse(res, GroupService, groupService.hardDelete, [groupId]);
    res.status(200).send({
      success: true,
      message: 'Group deleted'
    });
  });
};
