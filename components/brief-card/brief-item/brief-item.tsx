import { FunctionComponent } from "react";
import './styles.scss'

interface BriefItemProps {
  className?: string;
  title: string;
  value: string | number;
}


const BriefItem: FunctionComponent<BriefItemProps> = ({
  className,
  title,
  value = 0
}) => {
  return (
    <div className={`brief-item ${className && className || ''}`}>
      <span>
        {value}
      </span>

      <p className="title">
        {title}
      </p>
    </div>
  )
}

export default BriefItem;