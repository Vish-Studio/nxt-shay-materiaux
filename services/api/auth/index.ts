import { api } from '@/services/api/base/base-api';

class AuthApi {
  public async authenticate(body: any) {
    return await api.post('/auth/authenticate', body);
  }
}

export const authApi = new AuthApi();
