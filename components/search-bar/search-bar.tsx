'use client'

import React, { FunctionComponent, useContext, useRef, useState } from "react";
import "./styles.scss";
import Icon from "../icon/icon";
import SearchBarProps from "./type/seach-bar-props";
import { SearchContext } from "@/context/SearchContext";

const SearchBar: FunctionComponent<SearchBarProps> = ({
    className = '',
    hintText = "Search here .. "
}) => {
    const [btnCloseVisible, setBtnCloseVisible] = useState<boolean>(false);
    const { searchResults, setSearchResults } = useContext(SearchContext)

    const inputRef = useRef(null)

    const inputChange = () => {
        if (searchResults.length > (-1)) {
            setBtnCloseVisible(true);
        } else {
            setBtnCloseVisible(false);
        }
        setSearchResults(inputRef?.current?.value);
    }

    const btnClearClick = () => {
        setSearchResults('');
        setBtnCloseVisible(false);
    }

    return (
        <div className="search-bar">
            <div className="btn-search">
                <Icon iconName="search" />
            </div>

            <div className="input-search">
                <input
                    ref={inputRef}
                    placeholder={hintText}
                    type="text"
                    name="search"
                    value={searchResults}
                    onChange={inputChange}
                />
            </div>

            <div
                className={`btn-clear ${btnCloseVisible ? 'visible' : ''}`}
                onClick={btnClearClick}>
                <Icon iconName="close" />
            </div>
        </div>
    );
};




export default SearchBar;
