'use client'

import ButtonCardProps from "./type/button-card-props";
import './styles.scss'
import { FunctionComponent } from "react";
import Icon from "../icon/icon";
import ButtonFab from "../button-fab/button-fab";
import Link from "next/link";


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

  return (
    <Link href={redirect}>
      <div className={`button-card ${className}`}>
        <div className="button-card-top">
          <div className="title">
            <Icon iconName={iconName} />
            <p>
              {title}
            </p>
          </div>
          <ButtonFab
            clickHandler={() => alert('fab click')}
            icon="add"
            type="mini" />
        </div>

        <div className="button-card-bottom">
          <p><span>{numNew}</span>{numNewTxt}</p>
          <p><span>{numTotal}</span>{numTotalTxt}</p>
        </div>
      </div>
    </Link>
  )
}

export default ButtonCard;