import { format } from 'winston';

export const winstonMessageFormat = format.printf(({ level, message, method, argsPassed }) => {
  return `Level: ${level}; Method: ${method}; Arguments: [${argsPassed}]; Message: ${message}`;
});
