import mongoose from 'mongoose';
import { config } from '../config/index.js';

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

export const connectDB = async (): Promise<typeof mongoose> => {
  if (global.mongooseCache?.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(config.mongoUri).then((m) => {
      console.log('MongoDB connected');
      return m;
    });
  }

  try {
    global.mongooseCache.conn = await global.mongooseCache.promise;
    return global.mongooseCache.conn;
  } catch (error) {
    global.mongooseCache.promise = null;
    console.error('MongoDB connection error:', error);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};
