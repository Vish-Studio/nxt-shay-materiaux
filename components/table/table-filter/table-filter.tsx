import { FunctionComponent } from 'react';
import './styles.scss';
import Icon from '@/components/icon/icon';

export interface TabItem {
  title: string;
  clickHandle: () => void;
}

interface TableFilterProps {
  tabItems: TabItem[];
}

const TableFilter: FunctionComponent<TableFilterProps> = ({ tabItems, ...rest }) => {
  const handleSort = () => { };

  const handleFilter = () => { };

  return (
    <thead className="table-filter">
      <tr style={{
        width: '100%'
      }}>
        <td style={{ width: '90%' }}>
          <div className="tab-group">
            {tabItems.map((item, key) => {
              return (
                <button
                  className="tab-item"
                  key={key}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </td>

        <td style={{ width: '10%' }}>
          <div className="tab-sort">
            <button>
              <Icon iconName="swap_vert" />
            </button>
          </div>

          <div className="tab-filter">
            <button>
              <Icon iconName="swap_vert" />
            </button>
          </div>
        </td>
      </tr>
    </thead>
  );
};

export default TableFilter;
