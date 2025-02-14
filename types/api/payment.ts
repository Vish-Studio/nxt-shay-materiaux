import type { IPaymentType } from '../payment-type';

export interface IPayment extends IPaymentType {
  _id: string;
}
