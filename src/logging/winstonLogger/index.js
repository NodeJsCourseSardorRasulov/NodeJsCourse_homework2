import { createLogger, transports } from 'winston';

import { winstonMessageFormat, logFilenames } from '../constants/index.js';

const { winstonErrorLogFilename, winstonExceptionsLogFilename, winstonRejectiosLogFilename } = logFilenames;

export const winstonLogger = createLogger({
  format: winstonMessageFormat,
  transports: [new transports.File({ filename: winstonErrorLogFilename })],
  exceptionsLogger: [new transports.File({ filename: winstonExceptionsLogFilename })],
  rejectionHandlers: [new transports.File({ filename: winstonRejectiosLogFilename })]
});

