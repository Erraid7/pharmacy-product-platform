import { UserModel } from '../models/User.js';
import { CreateUserInput, UpdateUserInput } from '../validators/schemas.js';
import { createError } from '../middlewares/errorHandler.js';
import { ProductModel } from '../models/Product.js';

export async function createUser(input: CreateUserInput) {
  const existingUser = await UserModel.findOne({ email: input.email });
  
  if (existingUser) {
    throw createError('Email already exists', 400);
  }

  const user = new UserModel(input);
  await user.save();
  
  return user.toJSON();
}

export async function getUsers() {
  const users = await UserModel.find().sort({ createdAt: -1 });
  return users.map(user => user.toJSON());
}

export async function getUserById(userId: string) {
  const user = await UserModel.findById(userId);
  
  if (!user) {
    throw createError('User not found', 404);
  }
  
  return user.toJSON();
}

export async function updateUser(userId: string, input: UpdateUserInput) {
  const user = await UserModel.findById(userId);
  
  if (!user) {
    throw createError('User not found', 404);
  }

  // Check if email is being changed and if it already exists
  if (input.email && input.email !== user.email) {
    const existingUser = await UserModel.findOne({ email: input.email });
    if (existingUser) {
      throw createError('Email already exists', 400);
    }
  }

  Object.assign(user, input);
  await user.save();
  
  return user.toJSON();
}

export async function deleteUser(userId: string) {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createError('User not found', 404);
  }

  // Delete every product this user created
  await ProductModel.deleteMany({ createdBy: userId });
  await ProductModel.deleteMany({ orderedBy: userId });


  await UserModel.findByIdAndDelete(userId);

  return user.toJSON();
}
