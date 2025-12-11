import fs from 'fs';
import morgan from 'morgan';

import { getTokensConfig, getFormatConfig } from '../helpers/index.js';
import { logFilenames, formatName } from '../constants/index.js';

const { morganLogFilename } = logFilenames;

export const createMorganLoggerMiddleware = () => {
  const tokensConfig = getTokensConfig();
  const formatConfig = getFormatConfig();
  const writableStream = fs.createWriteStream(morganLogFilename);

  tokensConfig.forEach(config => {
    const [tokenName, tokenCallback] = Object.values(config);

    morgan.token(tokenName, tokenCallback);
  });

  morgan.format(...formatConfig);

  return morgan(formatName, { stream: writableStream });
};
