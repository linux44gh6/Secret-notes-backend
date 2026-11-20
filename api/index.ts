import type { IncomingMessage, ServerResponse } from 'http';
import app from '../src/app';
import { connectDB } from '../src/config/db';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await connectDB();
  return app(req as never, res as never);
}