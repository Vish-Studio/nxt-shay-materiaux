import type { IPaymentType } from '../payment-type';
import type { IPayment } from './payment';
import type { IShop } from './shop';

export interface IClient extends IPaymentType {
  createDateTime: number;
  firstName: string;
  lastName: string;
  nid: string;
  brnNumber: number | null;
  mobileNumber?: number | null;
  phoneNumber: number | null;
  shops?: IShop[];
  deliveryDateTime: number;
  payments?: IPayment[];
}
