import type { IPaymentStatus } from '../payment-status';
import type { ICategory } from './category';

export interface IProduct extends IPaymentStatus {
  _id: string;
  name: string;
  quantity: number;
  category: ICategory;
  price: number;
  buyingPrice: number;
  moreInfo?: string;
}
