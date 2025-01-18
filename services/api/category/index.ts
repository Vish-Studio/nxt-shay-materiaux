import { apiRoutes } from '@/constants/routes/api-routes';
import { api } from '@/services/api/base/base-api';
import type { ICategory } from '@/types/api/category';

class CategoryApi {
  public async getAllCategories() {
    return await api.get<ICategory[]>(apiRoutes.categories.index);
  }
}

export const categoryApi = new CategoryApi();
