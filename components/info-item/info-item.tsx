import { FunctionComponent } from "react";
import InfoItemProps from "./type/info-item-props";
import './styles.scss';
import Icon from "../icon/icon";

const InfoItem: FunctionComponent<InfoItemProps> = ({
  className = '',
  icon,
  number,
  title,
  subTitle,
  hasMoreBtn = false
}) => {
  return (
    <div className={`info-item ${className}`}>
      {number && (
        <span>
          {number}
        </span>
      )
      }

      {
        icon && (
          <Icon iconName={icon} />
        )
      }

      <p className="title">
        {title}
        {subTitle && subTitle}
      </p>


    </div>
  )
}

export default InfoItem;