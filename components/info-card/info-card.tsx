import { FunctionComponent } from "react";
import InfoCardProps from "./type/info-card-props";
import './styles.scss'
import Link from "next/link";
import InfoItem from "../info-item/info-item";
import ButtonFab from "../button-fab/button-fab";


const InfoCard: FunctionComponent<InfoCardProps> = ({
  className = '',
  route,
  isInfo,
  infoContents,
  type
}) => {
  const getInfoOverviewNum = (): number => {
    return 0;
  }

  return (

    <div className={`info-card ${type} ${className}`}>
      {isInfo ? (
        <>
          <Link href={isInfo ? `/clients/${route}` : '/clients'}>
            <div className="info-details">
              <>
                {
                  infoContents?.map((item, key) => {
                    <div key={key}>
                      <InfoItem
                        icon="person"
                        title={item?.title}
                        hasMoreBtn={true}
                      />
                    </div>
                  })
                }
              </>
            </div>
          </Link >

          <div className={`action-buttons`}>
            {
              type === 'clients' ? (
                <>
                  <ButtonFab
                    className="button-fab-phone"
                    type="mini"
                    icon="call"
                    clickHandler={() => window.open('tel:12345')} />

                  <ButtonFab
                    className="button-fab-map"
                    type="mini"
                    icon="pin_drop"
                    clickHandler={() => window.open('tel:12345')} />
                </>
              ) : (
                <>
                  <ButtonFab
                    className="button-fab-add"
                    type="mini"
                    icon="add"
                    clickHandler={() => alert('increasing quantity')} />

                  <ButtonFab
                    className="button-fab-remove"
                    type="mini"
                    icon="remove"
                    clickHandler={() => alert('decreasing quantity')} />
                </>
              )
            }
          </div>
        </>
      ) : (
        <>
          <InfoItem
            number={2}
            title="new clients today"
          />

          <InfoItem
            number={345}
            title="total registered"
          />

          <InfoItem
            number={1}
            title="remaining payments"
          />

          <InfoItem
            number={7}
            title="new product bought today"
          />
        </>
      )
      }
    </div >
  )
}

export default InfoCard;