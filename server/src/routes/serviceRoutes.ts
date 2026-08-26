import { Router } from 'express';
import * as service from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../validators/validate.js';
import { serviceSchema } from '../validators/schemas.js';

const router = Router();

router.get('/', service.getServices);
router.get('/:slug', service.getService);

router.post('/', protect, authorize('admin', 'superadmin'), validate(serviceSchema), service.createService);
router.put('/:id', protect, authorize('admin', 'superadmin'), service.updateService);
router.delete('/:id', protect, authorize('admin', 'superadmin'), service.deleteService);

export default router;
