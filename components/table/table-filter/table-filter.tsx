import { FunctionComponent } from 'react';
import './styles.scss';
import Icon from '@/components/icon/icon';
import ButtonIcon from '@/components/button-icon/button-icon';

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
    <div className="table-filter">
      <div style={{ width: '90%' }}>
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
      </div>

      <div className="actions">
        <ButtonIcon
          className='btn-sort'
          icon='swap_vert'
          onClick={() => { }}
        />

        <ButtonIcon
          className='btn-filter'
          icon='filter_list'
          onClick={() => { }}
        />
      </div>
    </div>
  );
};

export default TableFilter;
