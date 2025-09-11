'use client'

import ButtonCardProps from "./type/button-card-props";
import './styles.scss'
import { FunctionComponent } from "react";
import Icon from "../icon/icon";
import ButtonFab from "../button-fab/button-fab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/constants/routes/app-routes";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";


const ButtonCard: FunctionComponent<ButtonCardProps> = ({
  className,
  title,
  iconName,
  numTotal,
  numTotalTxt,
  redirect,
  fabRedirect
}) => {
  const router = useRouter();
  const targetNumber = parseInt(numTotal) || 0;
  const animatedValue = useAnimatedCounter({
    targetValue: targetNumber,
    duration: 1500,
    startValue: 0
  });

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
          <p><span className="animated-number">{animatedValue}</span>{numTotalTxt}</p>
        </div>
      </div>

      <ButtonFab
        clickHandler={() => router.push(fabRedirect)}
        icon="add"
        type="mini" />
    </div>
  )
}

export default ButtonCard;