'use client';

import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { appRoutes } from '@/constants/routes/app-routes';
import DetailCardHeader from '@/components/detail-card-header/detail-card-header';
import DetailCard from '@/components/detail-card-wrapper/detail-card-wrapper';
import DetailCardItem from '@/components/detail-card-item/detail-card-item';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { clientApiService } from '@/services/api/client';
import { IClient } from '@/types/api/client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/button/button';
import { ButtonTypes } from '@/enums/button-types';
import Modal from '@/components/modal/modal';
import GoogleMap from '@/components/google-maps/google-map';
import ButtonFab from '@/components/button-fab/button-fab';

export default function Client() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });
  const [client, setClient] = useState<IClient>(Object);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    clientsData &&
      !clientsDataLoading &&
      clientsData.filter((client) => {
        if (client._id === slug) {
          setClient(client);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, clientsData]);

  const submitDeleteClient = async () => {
    const { status } = await clientApiService.deleteClient({ id: slug as string });
    if (status === 'success') {
      router.push(appRoutes.clients.index);
    } else {
      setErrorModalOpen(true);
    }
  };

  return (
    <main className="client-page">
      <div className="page-client-details">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.clients.index}
          title="Client detail"
          hasSearch={false}
        />

        <div className="main-content">
          <section className="client-details-header">
            <DetailCardHeader
              title={`${client.firstName} ${client.lastName}`}
              icon="account_circle"
            />
          </section>

          <section>
            <DetailCard title="General">
              <DetailCardItem
                title="ID Number"
                name={client.nid || '------'}
              />
              <DetailCardItem
                title="First name"
                name={client.firstName || '------'}
              />
              <DetailCardItem
                title="Last name"
                name={client.lastName || '------'}
              />
            </DetailCard>
          </section>

          <section className='address'>
            <DetailCard title="Location">
              <DetailCardItem
                title="Address"
                name={client?.shops?.[0]?.address?.name || '------'}
              />

              <DetailCardItem
                title="City"
                name={client?.shops?.[0]?.address?.city || '------'} />

              <GoogleMap
                zoom={15}
                lat={client?.shops?.[0].address.lat}
                lng={client?.shops?.[0].address.long}
                clickAddLoc={() => { }} />
            </DetailCard>
          </section>

          <section>
            <DetailCard title="Contact">
              <DetailCardItem
                title="Email"
                name={(client.email && client?.email) || '------'}
              />

              <DetailCardItem
                title="Mobile"
                name={(client.mobileNumber && client?.mobileNumber.toString()) || '------'}
              />

              <DetailCardItem
                title="Phone"
                name={(client.phoneNumber && client?.phoneNumber) || '------'}
              />
            </DetailCard>
          </section>

          <section>
            <DetailCard title="Company">
              <DetailCardItem
                title="Shop"
                name={client?.shops?.[0]?.shopName || '------'}
              />
              <DetailCardItem
                title="Business Registration Number"
                name={client.brnNumber || '------'}
              />
              <DetailCardItem
                title="Payment"
                name={client?.payments?.[0]?.value || '------'}
              />
            </DetailCard>
          </section>

          <Button
            className="btn-delete"
            iconName="delete"
            title="Delete"
            type={ButtonTypes.Submit}
            variant="rounded"
            isDisabled={false}
            onClick={() => setErrorModalOpen(true)}
          />
        </div>
      </div>

      {(client.mobileNumber || client.phoneNumber) && (
        <ButtonFab
          icon={'phone'}
          type={'normal'}
          clickHandler={() => window.open('tel:' + (client.mobileNumber || client.phoneNumber))}
        />
      )}

      <Modal
        title="Delete Client"
        description="Are you sure you want to delete this client?"
        isOpen={errorModalOpen}
        primaryText='Confirm'
        secondaryText='Cancel'
        primaryClick={submitDeleteClient}
        secondaryClick={() => setErrorModalOpen(false)}
      />
    </main>
  );
}
