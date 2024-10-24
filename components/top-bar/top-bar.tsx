'use client'

import { FunctionComponent } from "react";
import Icon from "../icon/icon";
import TopBarProps from "./type/top-bar-props";
import './styles.scss';
import Link from "next/link";


const TopBar: FunctionComponent<TopBarProps> = ({
  className = '',
  redirectBackLink = '/',
  title,
  hasSearch = false
}) => {
  const btnSearch = () => {
    alert('good')
  }

  return (
    <div className={`top-bar ${className}`}>
      <Link href={redirectBackLink}>
        <Icon iconName="arrow_back" />
      </Link>

      <div className="title">
        <h1>{title}</h1>

        {
          hasSearch && (
            <div className="btn-search" onClick={btnSearch}>
              <Icon iconName="search" />
            </div>
          )
        }
      </div>

    </div>
  )
}

export default TopBar;