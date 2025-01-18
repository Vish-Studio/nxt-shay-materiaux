import type { IProduct } from '@/types/api/product';

import { categorySchema } from './category';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';

// Register Category model explicitly
if (!mongoose.models.Category) {
  mongoose.model('Category', categorySchema);
}

export const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  buyingPrice: { type: Number, required: true },
  moreInfo: { type: String }
});

export const Product: Model<IProduct> =
  mongoose.models.Product || model<IProduct>('Product', productSchema, 'products');
