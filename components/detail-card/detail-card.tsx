import { ReactNode } from "react";

interface IDetailCardHeaderProps {
  className?: string;
  children: ReactNode
}


const DetailCardHeader = ({ className, children, ...rest }: IDetailCardHeaderProps) => {
  return (
    <div className={`detail-card-header ${className ?? ''}`} {...rest}>
      {children}
    </div>
  )
}

export default DetailCardHeader;