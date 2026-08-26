import { Response } from 'express';
import multer from 'multer';
import { uploadImage, uploadDocument } from '../services/cloudinaryService.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadSingleImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file provided' });
  const result = await uploadImage(req.file, req.body.folder || 'uraerotech');
  res.json({ success: true, data: result });
});

export const uploadSingleDocument = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file provided' });
  const result = await uploadDocument(req.file);
  res.json({ success: true, data: result });
});
