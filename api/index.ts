import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server/dist/app.js';
import { connectDB } from '../server/dist/config/database.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();
  return app(req, res);
}
