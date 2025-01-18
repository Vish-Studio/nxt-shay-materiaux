import type { ICategory } from '@/types/api/category';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';

export const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true }
});

export const Category: Model<ICategory> =
  mongoose.models.Category || model<ICategory>('Category', categorySchema, 'categories');
