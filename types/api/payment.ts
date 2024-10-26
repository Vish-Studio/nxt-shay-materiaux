import { IPaymentType } from '../payment-type';
import { IClient } from './client';

export interface IPayment extends IPaymentType {
  client: IClient;
}
