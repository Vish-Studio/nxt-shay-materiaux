import { api } from '../base/base-api';

import { apiRoutes } from '@/constants/routes/api-routes';
import type { IApiResponse } from '@/types/api/base';
import type { ICategory } from '@/types/api/category';

interface ICategoryApiService {
  getAllCategories(): Promise<IApiResponse<ICategory[]>>;
}

class CategoryApiService implements ICategoryApiService {
  public async getAllCategories(): Promise<IApiResponse<ICategory[]>> {
    return await api.get<ICategory[]>(apiRoutes.categories.index);
  }
}

export const categoryApiService = new CategoryApiService();
