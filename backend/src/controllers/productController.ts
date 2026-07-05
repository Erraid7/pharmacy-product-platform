import { Request, Response, NextFunction } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  orderProduct,
  unorderProduct,
} from '../services/productService.js';
import { createProductSchema, updateProductSchema } from '../validators/schemas.js';

export async function createProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = createProductSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: validation.error.issues[0]?.message || 'Invalid input'
      });
    }

    const product = await createProduct(validation.data, req.user!.userId);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export async function getProductsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.query;
    const products = await getProducts(status as string | undefined);
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = await getProductById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = updateProductSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: validation.error.issues[0]?.message || 'Invalid input'
      });
    }

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = await updateProduct(id, validation.data, req.user!.userId);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteProduct(id, req.user!.userId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function orderProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = await orderProduct(id, req.user!.userId);
    const populated = await product?.populate([
      { path: 'createdBy', select: 'email role' },
      { path: 'orderedBy', select: 'email role' },
    ]);
    res.json(populated);
  } catch (error) {
    next(error);
  }
}

export async function unorderProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = await unorderProduct(id);
    const populated = await product?.populate([
      { path: 'createdBy', select: 'email role' },
      { path: 'orderedBy', select: 'email role' },
    ]);
    res.json(populated);
  } catch (error) {
    next(error);
  }
}
