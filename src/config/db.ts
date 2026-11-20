import mongoose from 'mongoose';
import { env } from './env';


const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

const cache = globalWithMongoose.mongooseCache ?? { conn: null, promise: null };
globalWithMongoose.mongooseCache = cache;

export const connectDB = async () => {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(env.mongoUri);
  }

  cache.conn = await cache.promise;
  return cache.conn;
};