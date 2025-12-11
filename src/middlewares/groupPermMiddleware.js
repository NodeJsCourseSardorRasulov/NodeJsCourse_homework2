import { getPermissionCode } from '../helpers/index.js';

export const groupPermMiddleware = (req, _, next) => {
  const group = req.body;
  const { permissions } = group;
  const permissionCode = getPermissionCode(permissions);

  req.body = {
    ...group,
    permissions: permissionCode
  };

  next();
};
