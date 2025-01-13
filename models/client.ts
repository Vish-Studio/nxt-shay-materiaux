import type { IClient } from '@/types/api/client';
import mongoose, { Schema, model } from 'mongoose';

export const clientSchema = new Schema<IClient>({
  createDateTime: { type: Number, required: true },
  nid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  brnNumber: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  deliveryDateTime: { type: Number, required: true },
  shops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
  payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
});

export const Client = mongoose.models.Client || model<IClient>('Client', clientSchema, 'clients');
