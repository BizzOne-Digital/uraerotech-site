import { Router } from 'express';
import { upload, uploadSingleImage, uploadSingleDocument } from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.post(
  '/image',
  protect,
  authorize('admin', 'superadmin'),
  upload.single('file'),
  uploadSingleImage
);
router.post(
  '/document',
  protect,
  authorize('admin', 'superadmin'),
  upload.single('file'),
  uploadSingleDocument
);

export default router;
