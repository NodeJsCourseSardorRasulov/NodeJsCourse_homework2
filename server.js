import app from './src/app.js';

import { serverConnectionConfig } from './src/configs/index.js';

const { port } = serverConnectionConfig;

app.listen(port, () => {
  console.log(`Server is launched on port ${port}`);
});
