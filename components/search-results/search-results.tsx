import { FunctionComponent } from "react";
import SearchResultsProps from "./type/search-results-props";

const SearchResults: FunctionComponent<SearchResultsProps> = ({
  className = '',
  items,
  test
}) => {
  return (
    <div className={`${className} search-results ${(test.length >= 0) ? 'visible' : ''
      }`}>
      <p>Search results</p>

      <>
        {
          items
        }
        <p>{test}</p>
      </>
    </div>
  )
}

export default SearchResults;