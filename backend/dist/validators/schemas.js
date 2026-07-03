import { z } from 'zod';
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});
export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required').max(255),
    status: z.enum(['needed', 'ordered']),
});
export const createProductSchema = productSchema.omit({ status: true }).extend({
    status: z.literal('needed'),
});
export const updateProductSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    status: z.enum(['needed', 'ordered']).optional(),
});
export const userSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['worker', 'admin']).default('worker'),
});
export const createUserSchema = userSchema;
export const updateUserSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(['worker', 'admin']).optional(),
});
//# sourceMappingURL=schemas.js.map