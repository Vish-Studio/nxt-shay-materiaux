import type { IPaymentType } from '../payment-type';
import type { IPayment } from './payment';
import type { IShop } from './shop';

export interface IClient extends IPaymentType {
  firstName: string;
  lastName: string;
  nid: string;
  createDateTime: number;
  brnNumber: number;
  phoneNumber: string;
  deliveryDateTime: number;
  shops?: IShop[];
  payments?: IPayment[];
}
