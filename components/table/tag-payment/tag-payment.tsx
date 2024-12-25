import { FunctionComponent } from "react"
import './styles.scss'


interface TagPaymentProps {
  classname?: string;
  status: 'pending' | 'paid';
}

const TagPayment: FunctionComponent<TagPaymentProps> = ({
  classname,
  status
}) => {
  return (
    <div className={`tag-payment ${classname} ${status}`}></div>
  )
}

export default TagPayment;