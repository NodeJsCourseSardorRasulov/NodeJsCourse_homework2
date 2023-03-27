import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { serverConnectionConfig } from './configs/index.js';
import { createMorganLoggerMiddleware } from './logging/index.js';

const app = express();
const morganLoggerMiddleware = createMorganLoggerMiddleware();

const { port } = serverConnectionConfig;

app.listen(port, () => {
  console.log(`Server is launched on port ${port}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morganLoggerMiddleware);

export default app;
