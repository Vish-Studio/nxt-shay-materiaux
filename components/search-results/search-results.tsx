import { FunctionComponent } from "react";
import SearchResultsProps from "./type/search-results-props";
import './styles.scss';
import Icon from "../icon/icon";

const SearchResults: FunctionComponent<SearchResultsProps> = ({
  className = '',
  items
}) => {
  return (
    <div className={`${className} search-results`}>
      <p className="title">Search results</p>

      <div className="search-list">
        {
          items && items.map((item, key) => (
            <div
              key={key}
              className="search-list__item"
              onClick={() => alert(item?.title)}
            >
              <Icon iconName={item?.icon} />


              <div className="text-info">
                <p>{item?.title}</p>
                <span>{item?.subTitle}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SearchResults;