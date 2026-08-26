import { Router } from 'express';
import * as product from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../validators/validate.js';
import { productSchema } from '../validators/schemas.js';

const router = Router();

router.get('/admin/all', protect, authorize('admin', 'superadmin'), product.getAllProductsAdmin);
router.get('/featured', product.getFeaturedProducts);
router.get('/', product.getProducts);
router.get('/:slug/related', product.getRelatedProducts);
router.get('/:slug', product.getProduct);
router.post('/', protect, authorize('admin', 'superadmin'), validate(productSchema), product.createProduct);
router.put('/:id', protect, authorize('admin', 'superadmin'), product.updateProduct);
router.delete('/:id', protect, authorize('admin', 'superadmin'), product.deleteProduct);

export default router;
