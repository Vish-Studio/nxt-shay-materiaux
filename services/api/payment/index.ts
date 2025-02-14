import { apiRoutes } from '@/constants/routes/api-routes';
import { api } from '../base/base-api';
import type { IApiResponse } from '@/types/api/base';
import type { IPayment } from '@/types/api/payment';

interface IPaymentApiService {
  getPayments(): Promise<IApiResponse<IPayment[]>>;
}

class PaymentApiService implements IPaymentApiService {
  public async getPayments(): Promise<IApiResponse<IPayment[]>> {
    return await api.get<IPayment[]>(apiRoutes.payments.index);
  }
}

export const paymentApiService = new PaymentApiService();
