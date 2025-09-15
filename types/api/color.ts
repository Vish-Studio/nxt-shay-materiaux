import { IBase } from './base';

export interface IColor extends IBase {
  _id: string;
  name: string;
  hexValue: string;
}

export interface IBaseColorParams {
  id: string;
}

export interface IAddColorParams {
  name: string;
  hexValue: string;
}

export interface IUpdateColorParams extends IBaseColorParams, Partial<IAddColorParams> {}

export interface IDeleteColorParams extends IBaseColorParams {}
