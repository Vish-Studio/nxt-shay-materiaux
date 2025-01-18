import type { IUser } from '@/types/api/user';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';

export const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  phone: { type: String }
});

export const User = mongoose.models.User || model<IUser>('User', userSchema, 'users');
