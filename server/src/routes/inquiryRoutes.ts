import { Router } from 'express';
import * as inquiry from '../controllers/inquiryController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { validate } from '../validators/validate.js';
import { quoteSchema, contactSchema } from '../validators/schemas.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { antiSpam } from '../middleware/antiSpam.js';

const router = Router();

router.post('/quotes', formLimiter, antiSpam, optionalAuth, validate(quoteSchema), inquiry.createQuote);
router.get('/quotes/my', protect, inquiry.getMyQuotes);
router.get('/quotes/:reference', protect, inquiry.getQuoteByReference);
router.get('/quotes', protect, authorize('admin', 'superadmin'), inquiry.getAllQuotes);
router.patch('/quotes/:id', protect, authorize('admin', 'superadmin'), inquiry.updateQuoteStatus);

router.post('/contact', formLimiter, antiSpam, validate(contactSchema), inquiry.createContact);
router.get('/contact', protect, authorize('admin', 'superadmin'), inquiry.getAllContacts);
router.patch('/contact/:id', protect, authorize('admin', 'superadmin'), inquiry.markContactRead);

export default router;
