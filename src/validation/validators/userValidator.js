import { validator } from "./validator.js";
import { userSchema } from "../schemas/index.js";

export const userMiddlewareValidator = validator.query(userSchema);
