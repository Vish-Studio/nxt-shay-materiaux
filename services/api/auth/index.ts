import { apiRoutes } from '@/constants/routes/api-routes';
import { api } from '@/services/api/base/base-api';
import type { IUser } from '@/types/api/user';

class AuthApi {
  public async authenticate(body: any) {
    return await api.post<IUser>(apiRoutes.auth.authenticate, body);
  }

  public async me(body: any) {
    return await api.post<IUser>(apiRoutes.auth.me, body);
  }
}

export const authApi = new AuthApi();
