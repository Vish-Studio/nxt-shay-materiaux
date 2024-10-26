'use client'

import { FunctionComponent, useState } from "react";
import Icon from "../icon/icon";
import TopBarProps from "./type/top-bar-props";
import './styles.scss';
import Link from "next/link";
import SearchBar from "../search-bar/search-bar";
import { useRouter } from "next/navigation";


const TopBar: FunctionComponent<TopBarProps> = ({
  className = '',
  leftIcon,
  redirectBackLink = '/',
  title,
  hasSearch = false
}) => {
  const route = useRouter();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const btnSearch = () => {
    setShowSearchBar(!showSearchBar);
  }

  return (
    <div className={`top-bar ${className}`}>
      <div>
        {
          leftIcon ? (
            <Icon iconName={leftIcon} clickHandler={() => route.push(redirectBackLink)} />
          ) : (
            <Icon iconName="arrow_back" />

          )
        }
      </div>

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