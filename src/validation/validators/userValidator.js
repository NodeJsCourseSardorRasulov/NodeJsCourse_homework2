import { userSchema } from '../schemas/index.js';
import { validator } from './validator.js';

export const userMiddlewareValidator = validator.body(userSchema);
