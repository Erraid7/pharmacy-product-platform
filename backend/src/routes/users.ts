import { Router } from 'express';
import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = Router();

// All user routes require authentication and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// GET all users
router.get('/', getUsersController);

// GET single user
router.get('/:id', getUserController);

// POST create user
router.post('/', createUserController);

// PUT update user
router.put('/:id', updateUserController);

// DELETE user
router.delete('/:id', deleteUserController);

export default router;
