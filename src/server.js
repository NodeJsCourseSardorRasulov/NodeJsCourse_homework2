import express from 'express';
import bodyParser from 'body-parser';

import { serverConnectionConfig } from './configs/index.js';
import { createLoggerMiddleware } from './logging/index.js';

const app = express();
const loggerMiddleware = createLoggerMiddleware();

const { port } = serverConnectionConfig;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(loggerMiddleware);

app.listen(port, () => {
  console.log(`Server is launched on port ${port}`);
});

export default app;
