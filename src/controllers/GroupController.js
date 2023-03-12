import { groupMiddlewareValidator } from '../validation/index.js';
import { GroupService } from '../services/index.js';
import { GroupModel } from '../models/index.js';
import { routesConfig } from '../configs/index.js';

const { groupsRoutesPathname } = routesConfig;

const groupService = new GroupService(GroupModel);

export const GroupController = app => {
  app.get(`${groupsRoutesPathname}/:limit?`, async (req, res) => {
    const { limit } = req.params || {};

    const groups = await groupService.getAll(limit);

    res.status(200).send(groups);
  });

  app.post(`${groupsRoutesPathname}/`, groupMiddlewareValidator, async (req, res) => {
    const group = req.body;

    const newGroup = await groupService.create(group);

    res.status(201).send(newGroup);
  });

  app.put(`${groupsRoutesPathname}/:groupId`, groupMiddlewareValidator, async (req, res) => {
    const { groupId } = req.params;
    const updatingGroup = req.body;

    await groupService.update(updatingGroup, groupId);

    res.status(201).send('Group updated');
  });

  app.delete(`${groupsRoutesPathname}/:groupId`, async (req, res) => {
    const { groupId } = req.params;

    await groupService.hardDelete(groupId);

    res.status(200).send('Group deleted');
  });
};
