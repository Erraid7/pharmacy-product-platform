import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/userService.js';
import { createUserSchema, updateUserSchema } from '../validators/schemas.js';

export async function createUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = createUserSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: validation.error.issues[0]?.message || 'Invalid input'
      });
    }

    const user = await createUser(validation.data);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUsersController(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = updateUserSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: validation.error.issues[0]?.message || 'Invalid input'
      });
    }

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await updateUser(id, validation.data);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}
