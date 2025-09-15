import type { TPaymentStatusValues } from '../payment-status';
import { IBase } from './base';
import type { ICategory } from './category';

export interface IProduct extends IBase {
  _id: string;
  name: string;
  description?: string;
  color?: string;
  image?: string;
  quantity: number;
  category: ICategory;
  price: number;
  buyingPrice: number;
  deliveryDate?: string;
  paymentStatus: TPaymentStatusValues;
}

export interface IBaseProductParams {
  id: string;
}

export interface IAddProductParams {
  name: string;
  description?: string;
  quantity: number;
  category: string;
  price: number;
  buyingPrice: number;
  color?: string;
  deliveryDate?: string;
  image?: string;
  paymentStatus: TPaymentStatusValues;
}

export interface IUpdateProductParams extends IBaseProductParams, Partial<IAddProductParams> {}

export interface IDeleteProductParams extends IBaseProductParams {}
