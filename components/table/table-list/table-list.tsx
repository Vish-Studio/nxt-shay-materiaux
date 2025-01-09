'use client';
import { FunctionComponent, useState } from 'react';
import './styles.scss';
import TagPayment from '../tag-payment/tag-payment';
import { IClient } from '@/types/api/client';

interface TableProps {
  tableData?: IClient[];
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

  return (
    <table
      className="table-list"
      {...rest}
    >
      <tbody>
        {tableData?.map((item) => {
          return (
            <tr
              className={currentItem?.nid === item?.nid ? 'selected' : ''}
              key={item.nid}
              // onClick={() => setCurrentItem(item)}
              onClick={() => handleClick(item)}
            >
              <td className="status">
                <TagPayment status="pending" />
              </td>
              <td className="title">
                <p>{item.firstName + ' ' + item.lastName}</p>
                <span>{item?.shops?.length !== 0 && item?.shops[0].address.name}</span>
              </td>
              <td className="description">
                <p>Phone</p>
                <span>{item.phoneNumber}</span>
              </td>
              <td className="date">
                <p>Date</p>
                <span>{item.createDateTime}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableList;
