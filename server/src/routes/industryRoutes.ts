import { Router } from 'express';
import * as industry from '../controllers/industryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', industry.getIndustries);
router.get('/:slug', industry.getIndustry);

router.post('/', protect, authorize('admin', 'superadmin'), industry.createIndustry);
router.put('/:id', protect, authorize('admin', 'superadmin'), industry.updateIndustry);
router.delete('/:id', protect, authorize('admin', 'superadmin'), industry.deleteIndustry);

export default router;
