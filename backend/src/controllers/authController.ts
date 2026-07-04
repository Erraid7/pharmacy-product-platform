import { Request, Response, NextFunction } from 'express';
import { login, getUserById } from '../services/authService.js';
import { loginSchema } from '../validators/schemas.js';
import { createError } from '../middlewares/errorHandler.js';

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = loginSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: validation.error.issues[0]?.message || 'Invalid input'
      });
    }

    const { token, user } = await login(validation.data);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(req: Request, res: Response) {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
}

export async function meController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await getUserById(req.user.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
}
