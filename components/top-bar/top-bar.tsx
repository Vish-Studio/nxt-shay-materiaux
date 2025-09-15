'use client'

import { FunctionComponent, useState, useContext } from "react";
import Icon from "../icon/icon";
import TopBarProps from "./type/top-bar-props";
import './styles.scss';
import Link from "next/link";
import SearchBar from "../search-bar/search-bar";
import { useRouter } from "next/navigation";
import { SearchContext } from "@/context/SearchContext";


const TopBar: FunctionComponent<TopBarProps> = ({
  className = '',
  leftIcon,
  redirectBackLink = '/',
  title,
  titleCenter,
  hasSearch = false
}) => {
  const route = useRouter();
  const { setSearchResults } = useContext(SearchContext);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)

  const btnSearch = () => {
    if (showSearchBar) {
      // Reset search value when closing the search bar
      setSearchResults('');
    }
    setShowSearchBar(!showSearchBar);
  }

  return (
    <div className={`top-bar ${className} ${titleCenter ? 'centered' : ''}`}>
      <div className="btn-back">
        {
          leftIcon ? (
            <Icon iconName={leftIcon} clickHandler={() => route.push(redirectBackLink)} />
          ) : (
            <Link href={redirectBackLink}>
              <Icon iconName="arrow_back" />
            </Link>

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
      </div>
      {
        hasSearch && (
          <button className="btn-search" onClick={btnSearch}>
            <Icon iconName={`${showSearchBar ? 'close' : 'search'}`} />
          </button>
        )
      }
    </div>
  )
}

export default TopBar;