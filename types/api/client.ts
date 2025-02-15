import type { IPaymentType } from '../payment-type';
import type { IPayment } from './payment';
import type { IShop } from './shop';

export interface IClient extends IPaymentType {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  nid: string;
  brnNumber: string | null;
  mobileNumber?: string | null;
  phoneNumber: string | null;
  shops?: IShop[];
  deliveryDateTime: string[];
  payments?: IPayment[];
  createdAt?: string;
}

export interface IBaseClientParams {
  id: string;
}

export interface IAddClientParams {
  firstName: string;
  lastName: string;
  nid: string;
  brnNumber: string | null;
  mobileNumber?: string | null;
  phoneNumber: string | null;
  email?: string;
  shops?: IShop[];
  deliveryDateTime: string[];
  payments?: string[]; // Should accept a list of Object Ids instead of actual payments objects
}

export interface IUpdateClientParams extends IBaseClientParams, Partial<IAddClientParams> {}

export interface IDeleteClientParams extends IBaseClientParams {}
