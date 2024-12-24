
import { FunctionComponent } from "react";
import './styles.scss'

export interface TabItem {
  title: string;
  clickHandle: () => void
}

interface TableFilterProps {
  tabItems: TabItem[];
}

const TableFilter: FunctionComponent<TableFilterProps> = ({
  tabItems,
  ...rest
}) => {
  const handleSort = () => {

  }

  const handleFilter = () => {

  }

  return (
    <div className="table-filter">
      <div className="tab-group">
        {
          tabItems.map((item, key) => {
            return (
              <button className="tab-item" key={key}>
                {item.title}
              </button>
            )
          })}
      </div>

      <div className="tab-sort">
        <button>test</button>
      </div>
    </div>
  )
}


export default TableFilter