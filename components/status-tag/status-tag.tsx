import type { FunctionComponent } from 'react';

import './styles.scss';

export type StatusType = 'payment' | 'stock' | 'general';
export type StatusValue = 'paid' | 'unpaid' | 'pending' | 'active' | 'inactive' | 'available' | 'unavailable' | 'in-stock' | 'out-of-stock';

interface StatusTagProps {
  className?: string;
  type?: StatusType;
  status: StatusValue;
  size?: 'small' | 'medium' | 'large';
}

const StatusTag: FunctionComponent<StatusTagProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  type = 'general',
  status,
  size = 'small',
  ...rest
}) => {
  // Map status values to consistent color classes
  const getStatusClass = (status: StatusValue) => {
    switch (status) {
      case 'paid':
      case 'active':
      case 'available':
      case 'in-stock':
        return 'success';
      case 'unpaid':
      case 'inactive':
      case 'unavailable':
      case 'out-of-stock':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const statusClass = getStatusClass(status);

  return (
    <div
      className={`status-tag ${className} ${statusClass} ${size} ${type}`}
      data-status={status}
      {...rest}
    />
  );
};

StatusTag.displayName = 'StatusTag';

export default StatusTag;
