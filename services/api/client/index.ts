import { apiRoutes } from '@/constants/routes/api-routes';
import { api } from '../base/base-api';
import type { IClient } from '@/types/api/client';

class ClientsApi {
  public async getAllClients() {
    return await api.get<IClient[]>(apiRoutes.clients.index);
  }
}

export const clientsApi = new ClientsApi();
