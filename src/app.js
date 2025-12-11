import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { createRoutes } from './routes/index.js';
import { createMorganLoggerMiddleware } from './logging/index.js';

const app = express();
const morganLoggerMiddleware = createMorganLoggerMiddleware();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morganLoggerMiddleware);

createRoutes(app);

export default app;
