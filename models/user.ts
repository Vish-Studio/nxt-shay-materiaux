import mongoose, { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  age: number;
  phone?: string;
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: String
});

export const User = mongoose.models.User || model<IUser>('users', userSchema);
