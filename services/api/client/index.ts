import { apiRoutes } from '@/constants/routes/api-routes';
import { api } from '../base/base-api';

class ClientsApi {
  public async getAllClients() {
    return await api.get(apiRoutes.clients.index);
  }
}

export const clientsApi = new ClientsApi();
