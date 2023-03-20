import { winstonLogger } from '../logging/index.js';

// eslint-disable-next-line no-unused-vars
export const errorHandlingAndLoggingMiddleware = (err, req, res, next) => {
  const { message } = err;

  winstonLogger.error(message);

  console.log('error handliing and logging middleware', message);

  res.status(500).send('Internal Server Error');
};
