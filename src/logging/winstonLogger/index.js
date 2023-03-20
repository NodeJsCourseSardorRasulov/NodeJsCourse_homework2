import { createLogger, transports } from 'winston';

export const winstonLogger = createLogger({
  transports: [new transports.Console()],
  exceptionsLogger: [new transports.File({ filename: 'exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'rejections.log' })]
});

