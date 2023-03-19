import fs from 'fs';
import morgan from 'morgan';

import { getTokensConfig, getFormatConfig } from '../helpers/index.js';
import { logFilename, formatName } from '../constants/index.js';

export const createLoggerMiddleware = () => {
  const tokensConfig = getTokensConfig();
  const formatConfig = getFormatConfig();
  const writableStream = fs.createWriteStream(logFilename);

  tokensConfig.forEach(config => {
    const [tokenName, tokenCallback] = Object.values(config);

    morgan.token(tokenName, tokenCallback);
  });

  morgan.format(...formatConfig);

  return morgan(formatName, { stream: writableStream });
};
