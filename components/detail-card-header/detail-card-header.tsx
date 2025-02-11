
import Icon from "../icon/icon";
import './styles.scss';



interface IDetailCardHeaderProps {
  className?: string;
  title: string;
  icon: string;
}


const DetailCardHeader = ({ className, title, icon, ...rest }: IDetailCardHeaderProps) => {
  return (
    <div className={`detail-card-header ${className ?? ''}`} {...rest}>
      <div className="detail-card-header__icon">
        <Icon iconName={icon} />
      </div>
      <div className="detail-card-header__title">
        <p>{title}</p>
      </div>
    </div>
  )
}

export default DetailCardHeader;