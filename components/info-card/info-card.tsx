import { appRoutes } from '@/constants/routes/app-routes';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import ButtonFab from '../button-fab/button-fab';
import InfoItem from '../info-item/info-item';
import './styles.scss';
import InfoCardProps from './type/info-card-props';

const InfoCard: FunctionComponent<InfoCardProps> = ({
  className = '',
  isInfo,
  infoContents,
  type
}) => {
  return (
    <div className={`info-card ${type} ${className}`}>
      {isInfo ? (
        <>
          <Link
            href={
              isInfo
                ? `${appRoutes.clients.index}/${infoContents?.firstName}`
                : `${appRoutes.clients.index}`
            }
          >
            <div className="info-details">
              <InfoItem
                icon="person"
                title={infoContents?.firstName}
                hasMoreBtn={true}
              />

              <InfoItem
                icon="person"
                title={infoContents?.lastName}
                hasMoreBtn={true}
              />
            </div>
          </Link>

          <div className={`action-buttons`}>
            {type === 'clients' ? (
              <>
                <ButtonFab
                  className="button-fab-phone"
                  type="mini"
                  icon="call"
                  clickHandler={() => window.open(`tel:${infoContents?.phoneNumber}`)}
                />

                <ButtonFab
                  className="button-fab-map"
                  type="mini"
                  icon="pin_drop"
                  clickHandler={() => window.open('tel:12345')}
                />
              </>
            ) : (
              <>
                <ButtonFab
                  className="button-fab-add"
                  type="mini"
                  icon="add"
                  clickHandler={() => alert('increasing quantity')}
                />

                <ButtonFab
                  className="button-fab-remove"
                  type="mini"
                  icon="remove"
                  clickHandler={() => alert('decreasing quantity')}
                />
              </>
            )}
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
      )}
    </div>
  );
};

export default InfoCard;
