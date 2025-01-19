'use client'

import { FunctionComponent, useState } from "react";
import ButtonCalendarProps from "./type/button-calendar-props";
import './styles.scss';
import Icon from "../icon/icon";
import Schedule from "./schedule/schedule";
import fakeData from './schedule/data.json'
import { useRouter } from "next/navigation";
import { appRoutes } from "@/constants/routes/app-routes";

const ButtonCalendar: FunctionComponent<ButtonCalendarProps> = ({
  className = "",
  date,
  items = fakeData
}) => {
  /**
   * FYI: @sleepinzombie
   * TODO: Replace all @active to @items when having dynamic data pulled.
   */

  const getMonth = (month: number | string) => {
    let monthTxt: string;

    switch (month) {
      case 1:
        monthTxt = 'January'
        break;
      case 2:
        monthTxt = 'February'
        break;
      case 3:
        monthTxt = 'March'
        break;
      case 4:
        monthTxt = 'April'
        break;
      case 5:
        monthTxt = 'May'
        break;
      case 6:
        monthTxt = 'June'
        break;
      case 7:
        monthTxt = 'July'
        break;
      case 8:
        monthTxt = 'August'
        break;
      case 9:
        monthTxt = 'September'
        break;
      case 10:
        monthTxt = 'October'
        break;
      case 11:
        monthTxt = 'November'
        break;
      case 12:
        monthTxt = 'December'
        break;
      default:
        monthTxt = '';
        break;
    }

    return monthTxt;
  }

  const router = useRouter();


  return (
    <div className={`button-calendar ${className}`} onClick={() => router.push(appRoutes.calendar.index)}>
      <div className="date">
        <div className="today">
          <Icon iconName="today" />
          <p>
            {date?.day}
          </p>
        </div>

        <p>{getMonth(date?.month)}</p>
      </div>

      <div className="schedules">


        {items ?
          <>
            {
              items && items?.data?.map((item, key) => (
                <Schedule
                  key={key}
                  title={item?.title}
                  time={item?.time}
                  color={item?.color}
                  restrictLength={true} />
              ))
            }
          </>
          :
          <Schedule isEmpty />
        }

      </div>
    </div>
  )
}

export default ButtonCalendar;