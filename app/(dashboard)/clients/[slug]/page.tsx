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

export default function Client() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });
  const [client, setClient] = useState<IClient>(Object);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(false);

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

  const deleteClient = async () => {
    setDeleteBtnDisabled(true);
    const { status } = await clientApiService.deleteClient({ id: slug as string });

    if (status === 'success') {
      router.push(appRoutes.clients.index);
    } else {
      alert('error');
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
          <section>
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
              <DetailCardItem
                title="Address"
                name={client?.shops?.[0]?.address?.name || '------'}
              />
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
                name={(client.phoneNumber && client?.phoneNumber.toString()) || '------'}
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
                name={client.brnNumber?.toString() || '------'}
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
            onClick={deleteClient}
          />
        </div>
      </div>
    </main>
  );
}
