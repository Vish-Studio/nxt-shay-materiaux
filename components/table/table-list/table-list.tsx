'use client'
import { FunctionComponent, useState } from "react";
import './styles.scss'
import TagPayment from "../tag-payment/tag-payment";
import { IClient } from "@/types/api/client";

interface TableProps {
  tableData?: IClient[];
  isClient?: boolean;
  click?: () => void;
}

const TableList: FunctionComponent<TableProps> = ({
  tableData,
  isClient = true,
  click,
  ...rest
}) => {
  const [currentItem, setCurrentItem] = useState<any>();
  const [selected, setSelected] = useState('')


  const handleClick = () => {
    console.log(currentItem);

  }
  return (
    <table className="table-list" {...rest}>
      <tbody>
        {
          tableData?.map(item => {
            return (
              <tr key={item.nid} onClick={() => setCurrentItem(item)}>
                <td className="status">
                  <TagPayment status="pending" />
                </td>
                <td className="title">
                  <p>{item.firstName + ' ' + item.lastName}</p>
                  <span>{item.shops.length !== 0 && item.shops[0].address.name}</span>
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
            )
          })
        }
      </tbody>
    </table>
  )
}

export default TableList;
// <tr>
//   <td className="status">
//     <TagPayment status="paid" />
//   </td>
//   <td className="title">
//     <p>John Dwayne Jr</p>
//     <span>Pamplemousses</span>
//   </td>
//   <td className="description">
//     <p>Qty</p>
//     <span>+230 5123 4567</span>
//   </td>
//   <td className="date">
//     <p>Date</p>
//     <span>Monday</span>
//   </td>
// </tr>