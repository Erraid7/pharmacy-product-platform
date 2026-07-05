import { ProductModel } from '../models/Product.js';
import { CreateProductInput, UpdateProductInput } from '../validators/schemas.js';
import { createError } from '../middlewares/errorHandler.js';
import mongoose from 'mongoose';

export async function createProduct(input: CreateProductInput, userId: string) {
  const product = new ProductModel({
    ...input,
    createdBy: userId,
  });
  
  await product.save();
  return await ProductModel.findById(product._id)
    .populate('createdBy', 'email');
}

export async function getProducts(status?: string) {
  const query: Record<string, any> = {};
  if (status) {
    query.status = status;
  }
  
  return ProductModel.find(query)
    .populate('createdBy', 'email')
    .populate('orderedBy', 'email')
    .sort({ createdAt: -1 });
}

export async function getProductById(productId: string) {
  const product = await ProductModel.findById(productId)
    .populate('createdBy', 'email')
    .populate('orderedBy', 'email');
  
  if (!product) {
    throw createError('Product not found', 404);
  }
  
  return product;
}

export async function updateProduct(productId: string, input: UpdateProductInput, userId: string) {
  const product = await ProductModel.findById(productId);
  
  if (!product) {
    throw createError('Product not found', 404);
  }

  // Only creator or admin can update (for now, just creator check)
  if (product.createdBy !== userId && !input.status) {
    throw createError('Unauthorized', 403);
  }

  Object.assign(product, input);
  await product.save();
  
  return await ProductModel.findById(productId)
    .populate('createdBy', 'email')
    .populate('orderedBy', 'email');
}

export async function deleteProduct(productId: string, userId: string) {
  const product = await ProductModel.findById(productId);
  
  if (!product) {
    throw createError('Product not found', 404);
  }

  // Only creator can delete
  if (product.createdBy !== userId) {
    throw createError('Unauthorized', 403);
  }

  await ProductModel.deleteOne({ _id: productId });
  return product;
}

export async function orderProduct(productId: string, userId: string) {
  const product = await ProductModel.findById(productId);
  
  if (!product) {
    throw createError('Product not found', 404);
  }

  product.status = 'ordered';
  product.orderedBy = userId;
  await product.save();
  
  return await ProductModel.findById(productId)
    .populate('createdBy', 'email')
    .populate('orderedBy', 'email');
}

export async function unorderProduct(productId: string) {
  const product = await ProductModel.findById(productId);
  
  if (!product) {
    throw createError('Product not found', 404);
  }

  product.status = 'needed';
  product.orderedBy = null;
  await product.save();
  
  return await ProductModel.findById(productId)
    .populate('createdBy', 'email')
    .populate('orderedBy', 'email');
}

export async function bulkDeleteProducts(ids: string[]) {
  if (!ids.length) {
    throw createError('No product ids provided', 400);
  }

  const result = await ProductModel.deleteMany({ _id: { $in: ids } });
  return { deletedCount: result.deletedCount };
}
