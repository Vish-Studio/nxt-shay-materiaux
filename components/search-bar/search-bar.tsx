'use client'

import React, { FunctionComponent, useRef, useState } from "react";
import "./styles.scss";
import Icon from "../icon/icon";
import SearchBarProps from "./type/seach-bar-props";

const SearchBar: FunctionComponent<SearchBarProps> = ({
    hintText = "Search here .. ",
}) => {
    const [btnCloseVisible, setBtnCloseVisible] = useState<boolean>(false);
    const [searchTxt, setSearchTxt] = useState<string>('')

    const inputRef = useRef(null)

    const inputChange = () => {
        if (searchTxt.length > (-1)) {
            setBtnCloseVisible(true);
        } else {
            setBtnCloseVisible(false);
        }
        setSearchTxt(inputRef?.current?.value);
    }

    const btnClearClick = () => {
        setSearchTxt('');
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
                    value={searchTxt}
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
