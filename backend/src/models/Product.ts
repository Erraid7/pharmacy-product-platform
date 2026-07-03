import mongoose from 'mongoose';
import { Product } from '../types/index.js';

const productSchema = new mongoose.Schema<Product>(
  {
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
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<Product>('Product', productSchema);
