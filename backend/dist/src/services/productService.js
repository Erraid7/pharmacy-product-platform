import { ProductModel } from '../models/Product.js';
import { createError } from '../middlewares/errorHandler.js';
export async function createProduct(input, userId) {
    const product = new ProductModel({
        ...input,
        createdBy: userId,
    });
    await product.save();
    return await ProductModel.findById(product._id)
        .populate('createdBy', 'email');
}
export async function getProducts(status) {
    const query = {};
    if (status) {
        query.status = status;
    }
    return ProductModel.find(query)
        .populate('createdBy', 'email')
        .populate('orderedBy', 'email')
        .sort({ createdAt: -1 });
}
export async function getProductById(productId) {
    const product = await ProductModel.findById(productId)
        .populate('createdBy', 'email')
        .populate('orderedBy', 'email');
    if (!product) {
        throw createError('Product not found', 404);
    }
    return product;
}
export async function updateProduct(productId, input, userId) {
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
export async function deleteProduct(productId, userId) {
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
export async function orderProduct(productId, userId) {
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
export async function unorderProduct(productId) {
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
//# sourceMappingURL=productService.js.map