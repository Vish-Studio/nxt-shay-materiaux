import type { IPayment } from '@/types/api/payment';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';

export const paymentSchema = new Schema<IPayment>({
  paymentType: { type: String, required: true }
});

export const Payment: Model<IPayment> =
  mongoose.models.Payment || model<IPayment>('Payment', paymentSchema, 'payments');
