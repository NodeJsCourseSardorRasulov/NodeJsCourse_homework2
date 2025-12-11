import Jwt from 'jsonwebtoken';

import { authSecret } from '../configs/index.js';

export const authMiddleware = (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    res.status(401).send('Unauthorized Error');
  }

  try {
    Jwt.verify(token, authSecret);

    return next();
  } catch (err) {
    console.log(err);
    res.status(403).send('Forbidden Error');
  }
};
