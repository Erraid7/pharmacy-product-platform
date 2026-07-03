import bcryptjs from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { LoginInput } from '../validators/schemas.js';
import { createError } from '../middlewares/errorHandler.js';

export async function login(input: LoginInput) {
  const user = await UserModel.findOne({ email: input.email });
  
  if (!user) {
    throw createError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcryptjs.compare(input.password, user.password);
  if (!isPasswordValid) {
    throw createError('Invalid email or password', 401);
  }

  const token = generateToken({
    userId: user._id!.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: user.toJSON(),
  };
}

export async function getUserById(userId: string) {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createError('User not found', 404);
  }
  return user.toJSON();
}
