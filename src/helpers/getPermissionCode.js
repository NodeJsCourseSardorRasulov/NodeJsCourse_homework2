import { groupPermissions } from '../configs/index.js';

export const getPermissionCode = permission => {
  return groupPermissions.indexOf(permission);
};
