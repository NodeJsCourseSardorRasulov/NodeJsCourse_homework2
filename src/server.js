import express from 'express';
import bodyParser from 'body-parser';

import { serverConnectionConfig } from './configs/index.js';

const app = express();

const { port } = serverConnectionConfig;

app.listen(port, () => {
  console.log(`Server is launched on port ${port}`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export default app;
