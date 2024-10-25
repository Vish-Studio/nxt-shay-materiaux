import { FunctionComponent } from "react";
import InfoCardProps from "./type/info-card-props";
import './styles.scss'
import Link from "next/link";


const InfoCard: FunctionComponent<InfoCardProps> = ({
  className = '',
  route,
  contents,
  type
}) => {
  console.log('SLUG', route);

  return (
    <Link href={`/clients/${route}`}>
      <div className={`info-card ${type} ${className}`}>

        <p>test</p>
      </div>
    </Link>
  )
}

export default InfoCard;