import type { IClient } from '@/types/api/client';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';
import { Shop } from './shop';
import { Payment } from './payment';

export const clientSchema = new Schema<IClient>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    nid: { type: String, required: false },
    brnNumber: { type: Number, required: false },
    phoneNumber: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    email: { type: String, required: false },
    shops: [{ type: Schema.Types.ObjectId, ref: Shop.modelName }],
    deliveryDateTime: [{ type: String, required: false }],
    payments: [{ type: Schema.Types.ObjectId, ref: Payment.modelName }]
  },
  {
    timestamps: true
  }
);

export const Client: Model<IClient> =
  mongoose.models.Client || model<IClient>('Client', clientSchema, 'clients');
