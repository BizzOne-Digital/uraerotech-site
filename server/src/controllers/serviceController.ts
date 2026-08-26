import { Response } from 'express';
import { Service } from '../models/Service.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getServices = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const services = await Service.find({ isActive: true }).sort('order');
  res.json({ success: true, data: services });
});

export const getService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const service = await Service.findOne({ slug: req.params.slug, isActive: true });
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, data: service });
});

export const createService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

export const updateService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, data: service });
});

export const deleteService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const service = await Service.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, message: 'Service deactivated' });
});
