import { CreateProductInput, UpdateProductInput } from '../validators/schemas.js';
import mongoose from 'mongoose';
export declare function createProduct(input: CreateProductInput, userId: string): Promise<(mongoose.Document<unknown, {}, import("../types/index.js").Product, {}, mongoose.DefaultSchemaOptions> & import("../types/index.js").Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function getProducts(status?: string): Promise<(mongoose.Document<unknown, {}, import("../types/index.js").Product, {}, mongoose.DefaultSchemaOptions> & import("../types/index.js").Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare function getProductById(productId: string): Promise<mongoose.Document<unknown, {}, import("../types/index.js").Product, {}, mongoose.DefaultSchemaOptions> & import("../types/index.js").Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare function updateProduct(productId: string, input: UpdateProductInput, userId: string): Promise<(mongoose.Document<unknown, {}, import("../types/index.js").Product, {}, mongoose.DefaultSchemaOptions> & import("../types/index.js").Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function deleteProduct(productId: string, userId: string): Promise<mongoose.Document<unknown, {}, import("../types/index.js").Product, {}, mongoose.DefaultSchemaOptions> & import("../types/index.js").Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare function orderProduct(productId: string, userId: string): Promise<(mongoose.Document<unknown, {}, import("../types/index.js").Product, {}, mongoose.DefaultSchemaOptions> & import("../types/index.js").Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function unorderProduct(productId: string): Promise<(mongoose.Document<unknown, {}, import("../types/index.js").Product, {}, mongoose.DefaultSchemaOptions> & import("../types/index.js").Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
//# sourceMappingURL=productService.d.ts.map