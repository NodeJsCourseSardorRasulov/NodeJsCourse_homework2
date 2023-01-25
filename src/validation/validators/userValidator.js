import { userSchema } from "../schemas/index.js";

export const userMiddlewareValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body, {
    aboartEarly: false,
    allowUnknown: false
  });

  if (error?.isJoi) {
    res.status(400).json(error.details);
  } else {
    next();
  }
};
