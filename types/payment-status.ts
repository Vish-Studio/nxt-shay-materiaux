import { PaymentStatus } from '@/enums/payment-status';

export type TPaymentStatusValues = keyof typeof PaymentStatus;

export interface IPaymentStatus {
  paymentStatus: TPaymentStatusValues;
}
