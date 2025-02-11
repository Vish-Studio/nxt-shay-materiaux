import { ReactNode } from 'react';
import './styles.scss';
import Icon from '../icon/icon';

interface IDetailCardWrapperProps {
  className?: string;
  title: string;
  isEditing?: boolean;
  children: ReactNode;
}

const DetailCardWrapper = ({
  className,
  title,
  isEditing,
  children,
  ...rest
}: IDetailCardWrapperProps) => {
  return (
    <div
      className={`detail-card ${className ?? ''}`}
      {...rest}
    >
      <div className="detail-card-title">
        <p>{title}</p>

        <Icon iconName="mode_edit" />
      </div>

      <div className="detail-card-content">{children}</div>
    </div>
  );
};

export default DetailCardWrapper;
