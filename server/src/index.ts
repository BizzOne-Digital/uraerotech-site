import app from './app.js';
import { connectDB } from './config/database.js';
import { config } from './config/index.js';

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

start();
