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
import { useParams } from 'next/navigation';

export default function Client() {
  const params = useParams();
  const { slug } = params;
  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });
  const [client, setClient] = useState<IClient>(Object);

  useEffect(() => {
    clientsData &&
      !clientsDataLoading &&
      clientsData.filter((client) => {
        if (client._id === slug) {
          setClient(client);
        }
      });
  }, [slug, clientsData]);

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
                name={client?.shops?.[0]?.address.name || '------'}
              />
            </DetailCard>
          </section>

          {client?.email || client?.phoneNumber || client?.mobileNumber && (
            <section>
              <DetailCard title="Contact">
                {client.email && (
                  <DetailCardItem
                    title="Email"
                    name={client.email || '------'}
                  />
                )}
                {client.mobileNumber && (
                  <DetailCardItem
                    title="Mobile"
                    name={client.mobileNumber.toString()}
                  />
                )}
                {client.phoneNumber && (
                  <DetailCardItem
                    title="Phone"
                    name={client.phoneNumber.toString()}
                  />
                )}
              </DetailCard>
            </section>
          )}

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
                name={client.paymentType || '------'}
              />
            </DetailCard>
          </section>
        </div>
      </div>
    </main>
  );
}
