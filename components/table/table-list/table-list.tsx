import { TClients } from "@/types/clients";
import { FunctionComponent } from "react";
import './styles.scss'
import TagPayment from "../tag-payment/tag-payment";

interface TableProps {
  tableData?: TClients;
  isClient?: boolean;
  click?: () => void;
}

const TableList: FunctionComponent<TableProps> = ({
  tableData,
  isClient = true,
  click,
  ...rest
}) => {
  return (
    <table className="table-list">
      <tbody>
        {
          isClient ? (
            <tr onClick={click}>
              <td className="status">
                <TagPayment status="pending" />
              </td>
              <td className="title">
                <p>John Dwayne Jr</p>
                <span>Pamplemousses</span>
              </td>
              <td className="description">
                <p>Phone</p>
                <span>+230 5123 4567</span>
              </td>
              <td className="date">
                <p>Date</p>
                <span>Monday</span>
              </td>
            </tr>
          ) : (
            <tr>
              <td className="status">
                <TagPayment status="paid" />
              </td>
              <td className="title">
                <p>John Dwayne Jr</p>
                <span>Pamplemousses</span>
              </td>
              <td className="description">
                <p>Qty</p>
                <span>+230 5123 4567</span>
              </td>
              <td className="date">
                <p>Date</p>
                <span>Monday</span>
              </td>
            </tr>
          )}
      </tbody>
    </table>
  )
}

export default TableList;