import { ReactNode, Children } from 'react';
import './styles.scss';
import Icon from '../icon/icon';

interface IDetailCardWrapperProps {
  className?: string;
  title: string;
  isEditing?: boolean;
  children: ReactNode;
  hideIfEmpty?: boolean; // New prop to control auto-hiding behavior
}

const DetailCardWrapper = ({
  className,
  title,
  isEditing,
  children,
  hideIfEmpty = true, // Default to true for auto-hiding
  ...rest
}: IDetailCardWrapperProps) => {
  // If hideIfEmpty is true, check if all children are null/undefined
  if (hideIfEmpty) {
    const childrenArray = Children.toArray(children);
    const hasValidChildren = childrenArray.some(child => child !== null && child !== undefined);

    if (!hasValidChildren) {
      return null;
    }
  }

  // Add special class for Created cards
  const isCreatedCard = title === "Created";
  const cardClasses = `detail-card ${isCreatedCard ? 'detail-card--created' : ''} ${className ?? ''}`.trim();

  return (
    <div
      className={cardClasses}
      {...rest}
    >
      <div className="detail-card-title">
        <p>{title}</p>
      </div>

      <div className="detail-card-content">{children}</div>
    </div>
  );
};

export default DetailCardWrapper;
