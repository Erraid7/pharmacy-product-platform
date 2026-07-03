import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['needed', 'ordered'],
        default: 'needed',
    },
    createdBy: {
        type: String,
        ref: 'User',
        required: true,
    },
    orderedBy: {
        type: String,
        ref: 'User',
        default: null,
    },
}, { timestamps: true });
export const ProductModel = mongoose.model('Product', productSchema);
//# sourceMappingURL=Product.js.map