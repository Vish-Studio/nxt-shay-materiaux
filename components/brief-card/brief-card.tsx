import { FunctionComponent, ReactNode } from "react";
import './styles.scss';


interface BriefCardProps {
  className?: string;
  type: 'products' | 'clients';
  children: ReactNode;
}


const BriefCard: FunctionComponent<BriefCardProps> = ({
  className,
  type = 'clients',
  children
}) => {
  return (
    <div className={`brief-card ${className && className || ''} ${type}`}>
      {children}
    </div>
  )
}

export default BriefCard;