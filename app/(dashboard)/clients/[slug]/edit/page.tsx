'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import TopBar from '@/components/top-bar/top-bar';
import { appRoutes } from '@/constants/routes/app-routes';
import { IClient } from '@/types/api/client';
import { clientApiService } from '@/services/api/client';
import { useApiFetch } from '@/hooks/use-api-fetch';
import Modal from '@/components/modal/modal';
import ClientForm from '@/components/client-form/client-form';
import { TLocation } from '@/components/google-maps/google-map';

import '../../new/styles.scss';
import '../../styles.scss';

export default function EditClient() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });

  const [client, setClient] = useState<IClient | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  // Find and set the client data when component loads
  useEffect(() => {
    if (clientsData && !clientsDataLoading && slug) {
      const foundClient = clientsData.find((client) => client._id === slug);
      if (foundClient) {
        setClient(foundClient);
      }
    }
  }, [slug, clientsData, clientsDataLoading]);

  const handleSubmit = async (data: any, location: TLocation) => {
    if (!client?._id) return;

    const updateData = {
      id: client._id,
      ...data
    };

    try {
      const { status } = await clientApiService.updateClient(updateData);

      if (status === 'success') {
        setSuccessModalOpen(true);
      } else {
        setErrorModalOpen(true);
      }
    } catch (error) {
      setErrorModalOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    router.push(appRoutes.clients.index + `/${slug}`);
  };

  if (clientsDataLoading) {
    return (
      <section className="new-clients-page">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.clients.index + `/${slug}`}
          title="Edit client"
        />
        <div className="content">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!client) {
    return (
      <section className="new-clients-page">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.clients.index}
          title="Edit client"
        />
        <div className="content">
          <p>Client not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="new-clients-page">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.clients.index + `/${slug}`}
        title="Edit client"
      />

      <div className="content">
        <ClientForm
          initialData={client}
          submitButtonText="Update"
          onSubmit={handleSubmit}
          loading={clientsDataLoading}
        />
      </div>

      <Modal
        className="warning"
        icon="error"
        title="Error"
        description="An error occurred while trying to update the client. Please try again or verify the values you are inputting."
        isOpen={errorModalOpen}
        primaryText='Try again'
        primaryClick={() => setErrorModalOpen(false)}
      />

      <Modal
        className="success"
        icon="check_circle"
        title="Success"
        description="Client has been updated successfully!"
        isOpen={successModalOpen}
        primaryText='OK'
        primaryClick={handleSuccessClose}
      />
    </section>
  );
}
