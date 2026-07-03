import { Router } from 'express';
import { loginController, logoutController, meController } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';
const router = Router();
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/me', authMiddleware, meController);
export default router;
//# sourceMappingURL=auth.js.map