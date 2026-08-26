import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/index.js';
import { AppError } from '../middleware/errorHandler.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_DOC_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_DOC_SIZE = 10 * 1024 * 1024;

export const uploadImage = async (
  file: Express.Multer.File,
  folder = 'uraerotech'
): Promise<{ url: string; publicId: string }> => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    throw new AppError('Invalid image type', 400);
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new AppError('Image too large (max 5MB)', 400);
  }

  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as { secure_url: string; public_id: string });
      }
    );
    stream.end(file.buffer);
  });

  return { url: result.secure_url, publicId: result.public_id };
};

export const uploadDocument = async (
  file: Express.Multer.File,
  folder = 'uraerotech/documents'
): Promise<{ url: string; publicId: string }> => {
  if (!ALLOWED_DOC_TYPES.includes(file.mimetype)) {
    throw new AppError('Invalid document type', 400);
  }
  if (file.size > MAX_DOC_SIZE) {
    throw new AppError('Document too large (max 10MB)', 400);
  }

  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as { secure_url: string; public_id: string });
      }
    );
    stream.end(file.buffer);
  });

  return { url: result.secure_url, publicId: result.public_id };
};

export const deleteFile = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    console.error('Failed to delete file:', publicId);
  }
};
