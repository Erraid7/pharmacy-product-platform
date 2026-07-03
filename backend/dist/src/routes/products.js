import { Router } from 'express';
import { createProductController, getProductsController, getProductController, updateProductController, deleteProductController, orderProductController, unorderProductController, } from '../controllers/productController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';
const router = Router();
// All product routes require authentication
router.use(authMiddleware);
// GET all products (with optional status filter)
router.get('/', getProductsController);
// GET single product
router.get('/:id', getProductController);
// POST create product
router.post('/', createProductController);
// PUT update product (owner or admin)
router.put('/:id', updateProductController);
// DELETE product (owner only)
router.delete('/:id', deleteProductController);
// POST order product (admin only)
router.post('/:id/order', adminMiddleware, orderProductController);
// POST unorder product (admin only)
router.post('/:id/unorder', adminMiddleware, unorderProductController);
export default router;
//# sourceMappingURL=products.js.map