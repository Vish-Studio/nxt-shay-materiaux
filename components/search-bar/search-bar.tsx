'use client'

import React, { FunctionComponent, useState } from "react";
import "./styles.scss";
import Icon from "../icon/icon";
import SearchBarProps from "./type/seach-bar-props";

const SearchBar: FunctionComponent<SearchBarProps> = ({
    hintText = "Search here .. ",
}) => {
    const [btnCloseVisible, setBtnCloseVisible] = useState<boolean>(false);


    return (
        <div className="search-bar">
            <div className="btn-search">
                <Icon iconName="search" />
            </div>

            <div className="input-search">
                <input
                    placeholder={hintText}
                    type="text"
                    name="search"
                    onFocus={() => setBtnCloseVisible(!btnCloseVisible)}
                />
            </div>

            <div className={`btn-clear ${btnCloseVisible ? 'visible' : ''}`}>
                <Icon iconName="close" />
            </div>
        </div>
    );
};




export default SearchBar;
