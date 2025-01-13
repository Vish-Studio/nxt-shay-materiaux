'use client'

import ButtonCardProps from "./type/button-card-props";
import './styles.scss'
import { FunctionComponent } from "react";
import Icon from "../icon/icon";
import ButtonFab from "../button-fab/button-fab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/constants/routes/app-routes";


const ButtonCard: FunctionComponent<ButtonCardProps> = ({
  className,
  title,
  iconName,
  numNew,
  numNewTxt,
  numTotal,
  numTotalTxt,
  redirect
}) => {
  const router = useRouter()
  return (

    <div className="button-card-container">
      <div className={`button-card ${className}`} onClick={() => router.push(redirect)}>
        <div className="button-card-top">
          <div className="title">
            <Icon iconName={iconName} />
            <p>
              {title}
            </p>
          </div>
        </div>

        <div className="button-card-bottom">
          <p><span>{numNew}</span>{numNewTxt}</p>
          <p><span>{numTotal}</span>{numTotalTxt}</p>
        </div>
      </div>

      <ButtonFab
        clickHandler={() => router.push(appRoutes.clients.new)}
        icon="add"
        type="mini" />
    </div>

  )
}

export default ButtonCard;