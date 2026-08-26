import { Router } from 'express';
import * as admin from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/settings', admin.getSettings);
router.put('/settings', protect, authorize('admin', 'superadmin'), admin.updateSettings);

router.get('/categories', admin.getCategories);
router.post('/categories', protect, authorize('admin', 'superadmin'), admin.createCategory);
router.put('/categories/:id', protect, authorize('admin', 'superadmin'), admin.updateCategory);
router.delete('/categories/:id', protect, authorize('admin', 'superadmin'), admin.deleteCategory);

router.post('/subscribe', admin.subscribe);

router.get('/dashboard', protect, authorize('admin', 'superadmin'), admin.getDashboardStats);
router.get('/users', protect, authorize('admin', 'superadmin'), admin.getUsers);
router.put('/users/:id', protect, authorize('admin', 'superadmin'), admin.updateUser);
router.get('/activity-logs', protect, authorize('admin', 'superadmin'), admin.getActivityLogs);
router.get('/export/quotes', protect, authorize('admin', 'superadmin'), admin.exportQuotes);

export default router;
