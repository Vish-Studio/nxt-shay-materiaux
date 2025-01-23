import { apiRoutes } from '@/constants/routes/api-routes';
import type {
  IAddProductParams,
  IDeleteProductParams,
  IProduct,
  IUpdateProductParams
} from '@/types/api/product';
import type { IApiResponse } from '@/types/api/base';

import { api } from '../base/base-api';

interface IProductApiService {
  getProducts(): Promise<IApiResponse<IProduct[]>>;
  createProduct(product: IAddProductParams): Promise<IApiResponse<IProduct>>;
  updateProduct(product: IUpdateProductParams): Promise<IApiResponse<IProduct>>;
  deleteProduct(product: IDeleteProductParams): Promise<IApiResponse<null>>;
}

class ProductApiService implements IProductApiService {
  public async getProducts(): Promise<IApiResponse<IProduct[]>> {
    return await api.get<IProduct[]>(apiRoutes.products.index);
  }

  public async createProduct(product: IAddProductParams): Promise<IApiResponse<IProduct>> {
    return await api.post<IProduct, IAddProductParams>(apiRoutes.products.index, product);
  }

  public async updateProduct(product: IUpdateProductParams): Promise<IApiResponse<IProduct>> {
    return await api.put<IProduct, IUpdateProductParams>(apiRoutes.products.index, product);
  }

  public async deleteProduct(product: IDeleteProductParams): Promise<IApiResponse<null>> {
    return await api.delete<null, IDeleteProductParams>(apiRoutes.products.index, product);
  }
}

export const productApiService = new ProductApiService();
