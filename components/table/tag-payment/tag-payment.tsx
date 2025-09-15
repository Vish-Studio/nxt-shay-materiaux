import type { FunctionComponent } from 'react';
import type { TPaymentStatusValues } from '@/types/payment-status';
import StatusTag from '@/components/status-tag/status-tag';

import './styles.scss';

interface TagPaymentProps {
  classname?: string;
  status: TPaymentStatusValues;
}

const TagPayment: FunctionComponent<TagPaymentProps & React.HTMLAttributes<HTMLDivElement>> = ({
  classname,
  status,
  ...rest
}) => {
  // Map payment status to generic status values
  const getStatusValue = (paymentStatus: TPaymentStatusValues) => {
    switch (paymentStatus) {
      case 'paid':
        return 'paid' as const;
      case 'unpaid':
        return 'unpaid' as const;
      case 'pending':
        return 'pending' as const;
      default:
        return 'unpaid' as const;
    }
  };

  return (
    <StatusTag
      className={`tag-payment ${classname || ''}`}
      type="payment"
      status={getStatusValue(status)}
      size="small"
      {...rest}
    />
  );
};

TagPayment.displayName = 'TagPayment';

export default TagPayment;
