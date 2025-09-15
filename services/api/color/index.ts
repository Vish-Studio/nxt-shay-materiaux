import { api } from '../base/base-api';
import { apiRoutes } from '@/constants/routes/api-routes';
import type { IApiResponse } from '@/types/api/base';
import type {
  IColor,
  IAddColorParams,
  IUpdateColorParams,
  IDeleteColorParams
} from '@/types/api/color';

interface IColorApiService {
  getAllColors(): Promise<IApiResponse<IColor[]>>;
  createColor(color: IAddColorParams): Promise<IApiResponse<IColor>>;
  updateColor(color: IUpdateColorParams): Promise<IApiResponse<IColor>>;
  deleteColor(color: IDeleteColorParams): Promise<IApiResponse<null>>;
}

class ColorApiService implements IColorApiService {
  public async getAllColors(): Promise<IApiResponse<IColor[]>> {
    return await api.get<IColor[]>(apiRoutes.colors.index);
  }

  public async createColor(color: IAddColorParams): Promise<IApiResponse<IColor>> {
    return await api.post<IColor, IAddColorParams>(apiRoutes.colors.index, color);
  }

  public async updateColor(color: IUpdateColorParams): Promise<IApiResponse<IColor>> {
    return await api.patch<IColor, IUpdateColorParams>(apiRoutes.colors.index, color);
  }

  public async deleteColor(color: IDeleteColorParams): Promise<IApiResponse<null>> {
    return await api.delete<null, IDeleteColorParams>(apiRoutes.colors.index, color);
  }
}

export const colorApiService = new ColorApiService();
