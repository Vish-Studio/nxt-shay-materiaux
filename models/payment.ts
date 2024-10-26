import type { IPayment } from '@/types/api/payment';
import mongoose, { Schema, model } from 'mongoose';

export const paymentSchema: any = new Schema<IPayment>({
  paymentType: { type: String, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client' }
});

export const Payment =
  mongoose.models.Payment || model<IPayment>('Payment', paymentSchema, 'payments');
