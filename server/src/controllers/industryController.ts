import { Response } from 'express';
import { Industry } from '../models/Industry.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getIndustries = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const industries = await Industry.find({ isActive: true }).sort('order');
  res.json({ success: true, data: industries });
});

export const getIndustry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const industry = await Industry.findOne({ slug: req.params.slug, isActive: true });
  if (!industry) throw new AppError('Industry not found', 404);
  res.json({ success: true, data: industry });
});

export const createIndustry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const industry = await Industry.create(req.body);
  res.status(201).json({ success: true, data: industry });
});

export const updateIndustry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!industry) throw new AppError('Industry not found', 404);
  res.json({ success: true, data: industry });
});

export const deleteIndustry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const industry = await Industry.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!industry) throw new AppError('Industry not found', 404);
  res.json({ success: true, message: 'Industry deactivated' });
});
