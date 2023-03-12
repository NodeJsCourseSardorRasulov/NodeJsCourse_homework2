import Joi from 'joi';

import { groupPermissions } from '../../configs/index.js';

export const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.string().valid(...groupPermissions).required()
});
