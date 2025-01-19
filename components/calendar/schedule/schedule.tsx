import { FunctionComponent } from "react";
import SchedulesProps from "./type/schedule-props";
import Icon from "@/components/icon/icon";
import './styles.scss';

const Schedule: FunctionComponent<SchedulesProps> = ({
  className = "",
  title,
  time,
  color = 'client',
  restrictLength,
  isEmpty,
  isMainComp,
  ...rest
}) => {
  return (
    <div className={`schedule ${className} ${color} ${isEmpty ? 'empty' : ''} ${isMainComp ? 'main' : ''}`} {...rest}>
      {title ?
        <>
          <div className="spacer"></div>

          <div className="content">
            <p>
              {title}
            </p>

            <div className="time">
              {!isMainComp && (
                <Icon iconName="schedule" />
              )}
              <p className="time__text">{time}</p>
            </div>
          </div>
        </>
        :
        <p>Nothing available for today...</p>
      }
    </div>
  )
}

export default Schedule;