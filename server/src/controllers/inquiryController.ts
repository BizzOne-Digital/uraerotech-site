import { Response } from 'express';
import { QuoteRequest } from '../models/QuoteRequest.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';
import { generateReference } from '../utils/helpers.js';
import { sendEmail, emailTemplates } from '../services/emailService.js';
import { config } from '../config/index.js';

export const createQuote = asyncHandler(async (req: AuthRequest, res: Response) => {
  const reference = generateReference('QR');
  const quote = await QuoteRequest.create({
    ...req.body,
    reference,
    user: req.user?._id,
    statusHistory: [{ status: 'new', changedAt: new Date() }],
  });

  await sendEmail(
    req.body.email,
    `Quote Request Received — ${reference}`,
    emailTemplates.quoteConfirmation(req.body.fullName, reference)
  );

  await sendEmail(
    config.adminEmail,
    `New Quote Request — ${reference}`,
    emailTemplates.adminNotification(
      'Quote Request',
      `Reference: ${reference}<br>Name: ${req.body.fullName}<br>Email: ${req.body.email}<br>Service: ${req.body.service || 'N/A'}<br>Urgency: ${req.body.urgency}`
    )
  );

  res.status(201).json({ success: true, data: { reference, id: quote._id } });
});

export const getMyQuotes = asyncHandler(async (req: AuthRequest, res: Response) => {
  const quotes = await QuoteRequest.find({ user: req.user!._id }).sort('-createdAt');
  res.json({ success: true, data: quotes });
});

export const getQuoteByReference = asyncHandler(async (req: AuthRequest, res: Response) => {
  const quote = await QuoteRequest.findOne({ reference: req.params.reference });
  if (!quote) throw new AppError('Quote not found', 404);
  if (req.user?.role === 'user' && quote.user?.toString() !== req.user._id.toString()) {
    throw new AppError('Forbidden', 403);
  }
  res.json({ success: true, data: quote });
});

export const getAllQuotes = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '20', status, search, sort = '-createdAt' } = req.query;
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { reference: new RegExp(search as string, 'i') },
      { fullName: new RegExp(search as string, 'i') },
      { email: new RegExp(search as string, 'i') },
    ];
  }

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const [quotes, total] = await Promise.all([
    QuoteRequest.find(filter)
      .sort(sort as string)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .populate('user', 'firstName lastName email'),
    QuoteRequest.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: quotes,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

export const updateQuoteStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status, note } = req.body;
  const quote = await QuoteRequest.findById(req.params.id);
  if (!quote) throw new AppError('Quote not found', 404);

  quote.status = status;
  quote.statusHistory.push({
    status,
    note,
    changedBy: req.user!._id,
    changedAt: new Date(),
  });
  if (req.body.adminNotes) quote.adminNotes = req.body.adminNotes;
  await quote.save();

  await sendEmail(
    quote.email,
    `Quote Update — ${quote.reference}`,
    emailTemplates.quoteStatusUpdate(quote.fullName, quote.reference, status)
  );

  res.json({ success: true, data: quote });
});

export const createContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const message = await ContactMessage.create(req.body);

  await sendEmail(
    req.body.email,
    'Message Received — UR Aerotech',
    emailTemplates.contactConfirmation(req.body.name)
  );

  await sendEmail(
    config.adminEmail,
    `New Contact Message — ${req.body.subject}`,
    emailTemplates.adminNotification(
      'Contact Message',
      `From: ${req.body.name}<br>Email: ${req.body.email}<br>Subject: ${req.body.subject}<br>AOG: ${req.body.isAOG ? 'Yes' : 'No'}`
    )
  );

  res.status(201).json({ success: true, data: { id: message._id } });
});

export const getAllContacts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = '1', limit = '20', isRead } = req.query;
  const filter: Record<string, unknown> = {};
  if (isRead !== undefined) filter.isRead = isRead === 'true';

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const [messages, total] = await Promise.all([
    ContactMessage.find(filter)
      .sort('-createdAt')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    ContactMessage.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: messages,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

export const markContactRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { isRead: true, adminNotes: req.body.adminNotes },
    { new: true }
  );
  if (!message) throw new AppError('Message not found', 404);
  res.json({ success: true, data: message });
});
