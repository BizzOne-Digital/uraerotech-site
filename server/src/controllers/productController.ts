import { Response } from 'express';
import { Product } from '../models/Product.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    page = '1',
    limit = '12',
    search,
    category,
    condition,
    saleOrRental,
    manufacturer,
    availability,
    featured,
    sort = '-createdAt',
  } = req.query;

  const filter: Record<string, unknown> = { isActive: true };
  if (search) filter.$text = { $search: search as string };
  if (category) filter.category = category;
  if (condition) filter.condition = condition;
  if (saleOrRental) filter.saleOrRental = { $in: [saleOrRental, 'both'] };
  if (manufacturer) filter.manufacturer = new RegExp(manufacturer as string, 'i');
  if (availability) filter.availability = availability;
  if (featured === 'true') filter.featured = true;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .sort(sort as string)
      .skip(skip)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

export const getProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate(
    'category',
    'name slug'
  );
  if (!product) throw new AppError('Product not found', 404);
  res.json({ success: true, data: product });
});

export const getFeaturedProducts = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const products = await Product.find({ featured: true, isActive: true })
    .populate('category', 'name slug')
    .limit(8);
  res.json({ success: true, data: products });
});

export const getRelatedProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) throw new AppError('Product not found', 404);

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true,
  })
    .limit(4)
    .populate('category', 'name slug');

  res.json({ success: true, data: related });
});

// Admin CRUD
export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError('Product not found', 404);
  res.json({ success: true, data: product });
});

export const deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!product) throw new AppError('Product not found', 404);
  res.json({ success: true, message: 'Product deactivated' });
});

export const getAllProductsAdmin = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '20', search, sort = '-createdAt' } = req.query;
  const filter: Record<string, unknown> = {};
  if (search) filter.$text = { $search: search as string };

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name')
      .sort(sort as string)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});
