import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';

export interface IColor {
  _id: string;
  name: string;
  hexValue: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const colorSchema = new Schema<IColor>(
  {
    name: { type: String, required: true, unique: true },
    hexValue: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const Color: Model<IColor> =
  mongoose.models.Color || model<IColor>('Color', colorSchema, 'colors');
