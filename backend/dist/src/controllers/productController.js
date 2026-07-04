import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, orderProduct, unorderProduct, } from '../services/productService.js';
import { createProductSchema, updateProductSchema } from '../validators/schemas.js';
export async function createProductController(req, res, next) {
    try {
        const validation = createProductSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                error: validation.error.issues[0]?.message || 'Invalid input'
            });
        }
        const product = await createProduct(validation.data, req.user.userId);
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
}
export async function getProductsController(req, res, next) {
    try {
        const { status } = req.query;
        const products = await getProducts(status);
        res.json(products);
    }
    catch (error) {
        next(error);
    }
}
export async function getProductController(req, res, next) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const product = await getProductById(id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}
export async function updateProductController(req, res, next) {
    try {
        const validation = updateProductSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                error: validation.error.issues[0]?.message || 'Invalid input'
            });
        }
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const product = await updateProduct(id, validation.data, req.user.userId);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}
export async function deleteProductController(req, res, next) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await deleteProduct(id, req.user.userId);
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}
export async function orderProductController(req, res, next) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const product = await orderProduct(id, req.user.userId);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}
export async function unorderProductController(req, res, next) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const product = await unorderProduct(id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=productController.js.map