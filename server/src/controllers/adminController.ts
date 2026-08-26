import { Response } from 'express';
import { SiteSettings } from '../models/SiteSettings.js';
import { Category } from '../models/Category.js';
import { Subscriber } from '../models/Subscriber.js';
import { User } from '../models/User.js';
import { QuoteRequest } from '../models/QuoteRequest.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { Product } from '../models/Product.js';
import { ActivityLog } from '../models/ActivityLog.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getSettings = asyncHandler(async (_req: AuthRequest, res: Response) => {
  let settings = await SiteSettings.findOne({ key: 'main' });
  if (!settings) {
    settings = await SiteSettings.create({ key: 'main' });
  }
  res.json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const settings = await SiteSettings.findOneAndUpdate(
    { key: 'main' },
    req.body,
    { new: true, upsert: true }
  );
  res.json({ success: true, data: settings });
});

export const getCategories = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const categories = await Category.find({ isActive: true }).sort('order');
  res.json({ success: true, data: categories });
});

export const createCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) throw new AppError('Category not found', 404);
  res.json({ success: true, data: category });
});

export const deleteCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  await Category.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ success: true, message: 'Category deactivated' });
});

export const subscribe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email } = req.body;
  await Subscriber.findOneAndUpdate({ email }, { email, isActive: true }, { upsert: true });
  res.json({ success: true, message: 'Subscribed successfully' });
});

export const getDashboardStats = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const [totalProducts, totalQuotes, newQuotes, totalContacts, unreadContacts, totalUsers] =
    await Promise.all([
      Product.countDocuments({ isActive: true }),
      QuoteRequest.countDocuments(),
      QuoteRequest.countDocuments({ status: 'new' }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
      User.countDocuments({ role: 'user' }),
    ]);

  const recentQuotes = await QuoteRequest.find().sort('-createdAt').limit(5);
  const quotesByStatus = await QuoteRequest.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.json({
    success: true,
    data: {
      totalProducts,
      totalQuotes,
      newQuotes,
      totalContacts,
      unreadContacts,
      totalUsers,
      recentQuotes,
      quotesByStatus,
    },
  });
});

export const getUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '20' } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const [users, total] = await Promise.all([
    User.find().select('-password -refreshToken').skip((pageNum - 1) * limitNum).limit(limitNum),
    User.countDocuments(),
  ]);

  res.json({
    success: true,
    data: users,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

export const updateUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { isActive, role } = req.body;
  const update: Record<string, unknown> = {};
  if (isActive !== undefined) update.isActive = isActive;
  if (role && req.user!.role === 'superadmin') update.role = role;

  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select(
    '-password -refreshToken'
  );
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, data: user });
});

export const logActivity = async (
  userId: string,
  action: string,
  resource: string,
  resourceId?: string,
  details?: string
) => {
  await ActivityLog.create({ user: userId, action, resource, resourceId, details });
};

export const getActivityLogs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '50' } = req.query;
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const [logs, total] = await Promise.all([
    ActivityLog.find()
      .populate('user', 'firstName lastName email')
      .sort('-createdAt')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    ActivityLog.countDocuments(),
  ]);

  res.json({
    success: true,
    data: logs,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

export const exportQuotes = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const quotes = await QuoteRequest.find().sort('-createdAt').lean();
  const headers = [
    'Reference', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Urgency', 'Created',
  ];
  const rows = quotes.map((q) =>
    [q.reference, q.fullName, q.email, q.phone, q.company || '', q.service || '', q.status, q.urgency, q.createdAt].join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=quotes-export.csv');
  res.send(csv);
});
