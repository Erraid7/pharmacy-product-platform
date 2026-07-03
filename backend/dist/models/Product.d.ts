import mongoose from 'mongoose';
import { Product } from '../types/index.js';
export declare const ProductModel: mongoose.Model<Product, {}, {}, {}, mongoose.Document<unknown, {}, Product, {}, mongoose.DefaultSchemaOptions> & Product & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, Product>;
//# sourceMappingURL=Product.d.ts.map