'use client';
import { FunctionComponent, useState } from 'react';
import './styles.scss';
import TagPayment from '../tag-payment/tag-payment';
import { IClient } from '@/types/api/client';
import TableFilter, { TabItem } from '../table-filter/table-filter';

interface TableProps {
  tableData: IClient[];
  isClient?: boolean;
  clickEvent: (e: IClient) => void;
}

const TableList: FunctionComponent<TableProps> = ({
  tableData,
  isClient = true,
  clickEvent,
  ...rest
}) => {
  const [currentItem, setCurrentItem] = useState<IClient>();

  const handleClick = (item: IClient) => {
    clickEvent(item);
    setCurrentItem(item);
  };

  const tabGroup: TabItem[] = [
    {
      title: 'All',
      clickHandle: () => alert('test')
    },
    {
      title: 'Paid',
      clickHandle: () => alert('Paid')
    }
  ];

  return (
    <table
      className="table-list"
      {...rest}
    >
      <TableFilter tabItems={tabGroup} />
      <tbody>
        {tableData &&
          tableData?.map((item) => {
            return (
              <tr
                className={currentItem?.objId === item?.objId ? 'selected' : ''}
                key={item.nid}
                onClick={() => handleClick(item)}
              >
                <td className="status">
                  <TagPayment status="pending" />
                </td>
                <td className="title">
                  <p>{item.firstName + ' ' + item.lastName}</p>
                </td>
                <td className="description">
                  <span>{item.phoneNumber}</span>
                </td>
                <td className="date">
                  <span>{item.deliveryDateTime || 'Monday'}</span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableList;
