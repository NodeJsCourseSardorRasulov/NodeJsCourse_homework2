import { groupSchema } from '../schemas/index.js';
import { validator } from './validator.js';

export const groupMiddlewareValidator = validator.body(groupSchema);
