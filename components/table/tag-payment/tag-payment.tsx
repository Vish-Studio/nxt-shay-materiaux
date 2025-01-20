import type { FunctionComponent } from 'react';
import type { TPaymentStatusValues } from '@/types/payment-status';

import './styles.scss';

interface TagPaymentProps {
  classname?: string;
  status: TPaymentStatusValues;
}

const TagPayment: FunctionComponent<TagPaymentProps> = ({ classname, status }) => {
  return <div className={`tag-payment ${classname} ${status}`}></div>;
};

export default TagPayment;
