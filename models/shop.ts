import type { IShop } from '@/types/api/shop';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';

export const shopSchema = new Schema<IShop>({
  shopName: { type: String, required: false },
  address: {
    name: { type: String },
    lat: { type: Number, required: false },
    long: { type: Number, required: false }
  }
});

export const Shop: Model<IShop> = mongoose.models.Shop || model<IShop>('Shop', shopSchema, 'shops');
