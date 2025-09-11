import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import SearchResultsProps from "./type/search-results-props";
import { appRoutes } from "@/constants/routes/app-routes";
import './styles.scss';
import Icon from "../icon/icon";

const SearchResults: FunctionComponent<SearchResultsProps> = ({
  className = '',
  items
}) => {
  const router = useRouter();

  const handleItemClick = (item: any) => {
    if (item.type === 'clients') {
      router.push(`${appRoutes.clients.index}/${item.id}`);
    } else if (item.type === 'products') {
      router.push(`${appRoutes.products.index}/${item.id}`);
    }
  };

  return (
    <div className={`${className} search-results`}>
      <p className="title">Search results</p>

      <div className="search-list">
        {
          items && items.map((item, key) => (
            <div
              key={key}
              className="search-list__item"
              onClick={() => handleItemClick(item)}
              style={{ cursor: 'pointer' }}
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