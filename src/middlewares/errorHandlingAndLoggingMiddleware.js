import { winstonLogger } from '../logging/index.js';

// eslint-disable-next-line no-unused-vars
export const errorHandlingAndLoggingMiddleware = (err, req, res, next) => {
  const { method, body } = req;
  const argsPassed = Object.values(body);
  const { message } = err;

  winstonLogger.log({
    level: 'error',
    argsPassed: argsPassed.join(', '),
    message,
    method
  });

  res.status(500).send('Internal Server Error');
};
