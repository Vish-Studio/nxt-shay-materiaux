import type { IClient } from '@/types/api/client';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';
import { Shop } from './shop';
import { Payment } from './payment';

export const clientSchema = new Schema<IClient>({
  createDateTime: { type: Number, required: true },
  nid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  brnNumber: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  deliveryDateTime: { type: Number, required: true },
  shops: [{ type: Schema.Types.ObjectId, ref: Shop.modelName }],
  payments: [{ type: Schema.Types.ObjectId, ref: Payment.modelName }]
});

export const Client: Model<IClient> =
  mongoose.models.Client || model<IClient>('Client', clientSchema, 'clients');
