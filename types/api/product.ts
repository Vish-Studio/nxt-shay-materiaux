import type { IPaymentStatus, TPaymentStatusValues } from '../payment-status';
import { IBase } from './base';
import type { ICategory } from './category';

export interface IProduct extends IBase, IPaymentStatus {
  _id: string;
  name: string;
  description: string;
  color?: string;
  image?: string;
  quantity: number;
  category: ICategory;
  price: IPrice;
  buyingPrice: number;
  moreInfo?: string;
}

export interface IPrice {
  selling: number;
  buying: number;
}

export interface IBaseProductParams {
  id: string;
}

export interface IAddProductParams {
  name: string;
  quantity: number;
  category: string;
  price: number;
  buyingPrice: number;
  paymentStatus: TPaymentStatusValues;
  moreInfo?: string; // Potentially this should not be optional, need to confirm
}

export interface IUpdateProductParams extends IBaseProductParams, Partial<IAddProductParams> {}

export interface IDeleteProductParams extends IBaseProductParams {}
