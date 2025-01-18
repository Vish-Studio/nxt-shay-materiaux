import type { ICategory } from './category';

export interface IProduct {
  _id: string;
  name: string;
  quantity: number;
  category: ICategory;
  price: number;
  buyingPrice: number;
  moreInfo?: string;
}
