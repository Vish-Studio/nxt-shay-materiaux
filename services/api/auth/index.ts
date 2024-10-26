import { api } from '@/services/api/base/base-api';

class AuthApi {
  public async authenticate(body: any) {
    return await api.post('/auth/authenticate', body);
  }

  public async me(body: any) {
    return await api.post('/auth/me', body);
  }
}

export const authApi = new AuthApi();
