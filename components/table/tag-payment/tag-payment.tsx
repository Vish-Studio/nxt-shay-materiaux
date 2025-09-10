import type { FunctionComponent } from 'react';
import type { TPaymentStatusValues } from '@/types/payment-status';

import './styles.scss';

interface TagPaymentProps {
  classname?: string;
  status: TPaymentStatusValues;
}

const TagPayment: FunctionComponent<TagPaymentProps & React.HTMLAttributes<HTMLDivElement>> = ({ classname, status, ...rest }) => {
  return (
    <div className={`tag-payment ${classname} ${status}`} {...rest}></div>
  );
};

TagPayment.displayName = 'TagPayment';

export default TagPayment;
