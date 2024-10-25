'use client'

import { FunctionComponent, useState } from "react";
import Icon from "../icon/icon";
import TopBarProps from "./type/top-bar-props";
import './styles.scss';
import Link from "next/link";
import SearchBar from "../search-bar/search-bar";


const TopBar: FunctionComponent<TopBarProps> = ({
  className = '',
  redirectBackLink = '/',
  title,
  hasSearch = false
}) => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const btnSearch = () => {
    setShowSearchBar(!showSearchBar);
  }

  return (
    <div className={`top-bar ${className}`}>
      <Link href={redirectBackLink}>
        <Icon iconName="arrow_back" />
      </Link>

      <div className="title">
        {
          !showSearchBar && <h1>{title}</h1>
        }
        {
          showSearchBar && (
            <div className="search-component">
              <SearchBar hintText="Search clients" />
            </div>
          )
        }
        {
          hasSearch && (
            <button className="btn-search" onClick={btnSearch}>
              <Icon iconName={`${showSearchBar ? 'close' : 'search'}`} />
            </button>
          )
        }
      </div>
    </div>
  )
}

export default TopBar;