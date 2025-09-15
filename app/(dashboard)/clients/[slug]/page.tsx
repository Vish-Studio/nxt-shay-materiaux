'use client';

import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { appRoutes } from '@/constants/routes/app-routes';
import DetailCardHeader from '@/components/detail-card-header/detail-card-header';
import DetailCard from '@/components/detail-card/detail-card-wrapper';
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
import dayjs from 'dayjs';

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

  // Helper function to format date
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Helper function to format time
  const formatTime = (date: string | Date | undefined) => {
    if (!date) return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to format day of week
  const formatDayOfWeek = (date: string | Date | undefined) => {
    if (!date) return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', {
      weekday: 'long'
    });
  };

  // Helper functions to check if sections have data
  const hasGeneralData = () => {
    return !clientsDataLoading && (client.nid || client.firstName || client.lastName);
  };

  const hasLocationData = () => {
    return !clientsDataLoading && (client?.shops?.[0]?.address?.name || client?.shops?.[0]?.address?.city);
  };

  const hasContactData = () => {
    return !clientsDataLoading && (client.email || client.mobileNumber || client.phoneNumber);
  };

  const hasCompanyData = () => {
    return !clientsDataLoading && (client?.shops?.[0]?.shopName || client.brnNumber || client?.payments?.[0]?.value);
  };

  const hasCreditData = () => {
    return !clientsDataLoading && client.credit && (client?.credit?.amount || client?.credit?.dueDateTime || client?.credit?.note);
  };

  const hasCreatedData = () => {
    return !clientsDataLoading && client.createdAt;
  };

  return (
    <main className="client-page">
      <div className={`page-client-details ${clientsDataLoading ? 'loading-page' : ''}`}>
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.clients.index}
          title="Client detail"
          hasSearch={false}
        />

        <div className="main-content">
          <section className="client-details-header">
            <DetailCardHeader
              title={clientsDataLoading ? "Loading client name..." : `${client.firstName} ${client.lastName}`}
              icon="account_circle"
            />
          </section>

          {(hasGeneralData() || clientsDataLoading) && (
            <section>
              <DetailCard title="General">
                <DetailCardItem
                  title="ID Number"
                  name={clientsDataLoading ? "Loading ID..." : client.nid}
                />
                <DetailCardItem
                  title="First name"
                  name={clientsDataLoading ? "Loading first name..." : client.firstName}
                />
                <DetailCardItem
                  title="Last name"
                  name={clientsDataLoading ? "Loading last name..." : client.lastName}
                />
              </DetailCard>
            </section>
          )}

          {(hasLocationData() || clientsDataLoading) && (
            <section className='address'>
              <DetailCard title="Location">
                <DetailCardItem
                  title="Address"
                  name={clientsDataLoading ? "Loading address..." : client?.shops?.[0]?.address?.name}
                />

                <DetailCardItem
                  title="City"
                  name={clientsDataLoading ? "Loading city..." : client?.shops?.[0]?.address?.city} />
              </DetailCard>
            </section>
          )}

          {(hasContactData() || clientsDataLoading) && (
            <section>
              <DetailCard title="Contact">
                <DetailCardItem
                  title="Email"
                  name={clientsDataLoading ? "Loading email..." : client.email}
                />

                <DetailCardItem
                  title="Mobile"
                  name={clientsDataLoading ? "Loading mobile..." : (client.mobileNumber ? client.mobileNumber.toString() : null)}
                />

                <DetailCardItem
                  title="Phone"
                  name={clientsDataLoading ? "Loading phone..." : client.phoneNumber}
                />
              </DetailCard>
            </section>
          )}

          {(hasCompanyData() || clientsDataLoading) && (
            <section>
              <DetailCard title="Company">
                <DetailCardItem
                  title="Shop"
                  name={clientsDataLoading ? "Loading shop..." : client?.shops?.[0]?.shopName}
                />
                <DetailCardItem
                  title="Business Registration Number"
                  name={clientsDataLoading ? "Loading BRN..." : client.brnNumber}
                />
                <DetailCardItem
                  title="Payment"
                  name={clientsDataLoading ? "Loading payment..." : client?.payments?.[0]?.value}
                />
              </DetailCard>
            </section>
          )}


          {(hasCreditData() || clientsDataLoading) && (
            <section className='credit'>
              <DetailCard title="Credit">
                <DetailCardItem
                  title="Credit"
                  name={clientsDataLoading ? "Loading credit amount..." : (client?.credit?.amount ? `Rs ${client.credit.amount.toString()}` : null)}
                />
                <DetailCardItem
                  title="Repayment date"
                  name={clientsDataLoading ? "Loading repayment date..." : (client?.credit?.dueDateTime ? dayjs(client.credit.dueDateTime).format('DD-MM-YYYY') : null)}
                />
                <DetailCardItem
                  title="Note"
                  name={clientsDataLoading ? "Loading note..." : client?.credit?.note}
                />
              </DetailCard>
            </section>
          )}

          {(hasCreatedData() || clientsDataLoading) && (
            <section>
              <DetailCard title="Created">
                <DetailCardItem
                  title="Date"
                  name={clientsDataLoading ? "Loading date..." : formatDate(client.createdAt)}
                />
                <DetailCardItem
                  title="Time"
                  name={clientsDataLoading ? "Loading time..." : formatTime(client.createdAt)}
                />
                <DetailCardItem
                  title="Day"
                  name={clientsDataLoading ? "Loading day..." : formatDayOfWeek(client.createdAt)}
                />
              </DetailCard>
            </section>
          )}

          <div className="action-buttons">
            <Button
              className="btn-edit"
              iconName="edit"
              title={clientsDataLoading ? "Loading..." : "Edit"}
              type={ButtonTypes.Button}
              variant="rounded"
              isDisabled={clientsDataLoading}
              clickHandler={() => router.push(appRoutes.clients.edit(slug as string))}
            />

            <Button
              className="btn-delete"
              iconName="delete"
              title={clientsDataLoading ? "Loading..." : "Delete"}
              type={ButtonTypes.Submit}
              variant="rounded"
              isDisabled={clientsDataLoading}
              clickHandler={() => setErrorModalOpen(true)}
            />
          </div>
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
