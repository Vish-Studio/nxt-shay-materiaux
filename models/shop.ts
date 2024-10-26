import type { IShop } from '@/types/api/shop';
import mongoose, { Schema, model } from 'mongoose';

export const shopSchema = new Schema<IShop>({
  shopName: { type: String, required: true },
  address: {
    name: { type: String },
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  }
});

export const Shop = mongoose.models.Shop || model<IShop>('Shop', shopSchema, 'shops');
