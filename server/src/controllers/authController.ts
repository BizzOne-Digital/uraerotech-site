import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';
import { setTokenCookies, clearTokenCookies } from '../utils/tokens.js';
import { generateToken } from '../utils/helpers.js';
import { sendEmail, emailTemplates } from '../services/emailService.js';

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpires as jwt.SignOptions['expiresIn'],
  });
  const refreshToken = jwt.sign({ id: userId }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpires as jwt.SignOptions['expiresIn'],
  });
  return { accessToken, refreshToken };
};

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password, firstName, lastName, phone, company, accountType } = req.body;

  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email already registered', 409);

  const hashedPassword = await bcrypt.hash(password, 12);
  const verificationToken = generateToken();

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phone,
    company,
    accountType,
    role: 'user',
    verificationToken,
  });

  const verifyUrl = `${config.clientUrl}/verify-email?token=${verificationToken}`;
  await sendEmail(email, 'Welcome to UR Aerotech', emailTemplates.welcome(firstName, verifyUrl));

  const tokens = generateTokens(user._id.toString());
  await User.findByIdAndUpdate(user._id, { refreshToken: tokens.refreshToken });
  setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      accountType: user.accountType,
    },
  });
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user || !user.isActive) throw new AppError('Invalid credentials', 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  const tokens = generateTokens(user._id.toString());
  await User.findByIdAndUpdate(user._id, { refreshToken: tokens.refreshToken });
  setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

  res.json({
    success: true,
    data: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      accountType: user.accountType,
      isVerified: user.isVerified,
    },
  });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
  }
  clearTokenCookies(res);
  res.json({ success: true, message: 'Logged out' });
});

export const refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) throw new AppError('No refresh token', 401);

  const decoded = jwt.verify(token, config.jwt.refreshSecret) as { id: string };
  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== token) throw new AppError('Invalid refresh token', 401);

  const tokens = generateTokens(user._id.toString());
  await User.findByIdAndUpdate(user._id, { refreshToken: tokens.refreshToken });
  setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

  res.json({ success: true });
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: req.user });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, phone, company } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user!._id,
    { firstName, lastName, phone, company },
    { new: true, runValidators: true }
  ).select('-password -refreshToken');

  res.json({ success: true, data: user });
});

export const forgotPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: true, message: 'If email exists, reset link sent' });
  }

  const resetToken = generateToken();
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);
  await user.save();

  const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}`;
  await sendEmail(email, 'Password Reset', emailTemplates.passwordReset(user.firstName, resetUrl));

  res.json({ success: true, message: 'If email exists, reset link sent' });
});

export const resetPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new AppError('Invalid or expired token', 400);

  user.password = await bcrypt.hash(password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ success: true, message: 'Password reset successful' });
});

export const verifyEmail = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token as string });
  if (!user) throw new AppError('Invalid verification token', 400);

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.json({ success: true, message: 'Email verified' });
});

export const toggleSavedProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productId } = req.params;
  const user = await User.findById(req.user!._id);
  if (!user) throw new AppError('User not found', 404);

  const index = user.savedProducts.findIndex((id) => id.toString() === productId);
  if (index > -1) {
    user.savedProducts.splice(index, 1);
  } else {
    user.savedProducts.push(productId as unknown as typeof user.savedProducts[0]);
  }
  await user.save();

  res.json({ success: true, data: user.savedProducts });
});
