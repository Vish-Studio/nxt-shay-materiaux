import { apiRoutes } from '@/constants/routes/api-routes';
import { api } from '../base/base-api';
import { IApiResponse } from '@/types/api/base';
import {
  IAddClientParams,
  IDeleteClientParams,
  IClient,
  IUpdateClientParams
} from '@/types/api/client';

interface IClientApiService {
  getClients(): Promise<IApiResponse<IClient[]>>;
  createClient(client: IAddClientParams): Promise<IApiResponse<IClient>>;
  updateClient(client: IUpdateClientParams): Promise<IApiResponse<IClient>>;
  deleteClient(client: IDeleteClientParams): Promise<IApiResponse<null>>;
}

class ClientApiService implements IClientApiService {
  public async getClients(): Promise<IApiResponse<IClient[]>> {
    return await api.get<IClient[]>(apiRoutes.clients.index);
  }

  public async createClient(client: IAddClientParams): Promise<IApiResponse<IClient>> {
    return await api.post<IClient, IAddClientParams>(apiRoutes.clients.index, client);
  }

  public async updateClient(client: IUpdateClientParams): Promise<IApiResponse<IClient>> {
    return await api.put<IClient, IUpdateClientParams>(apiRoutes.clients.index, client);
  }

  public async deleteClient(client: IDeleteClientParams): Promise<IApiResponse<null>> {
    return await api.delete<null, IDeleteClientParams>(apiRoutes.clients.index, client);
  }
}

export const clientApiService = new ClientApiService();
