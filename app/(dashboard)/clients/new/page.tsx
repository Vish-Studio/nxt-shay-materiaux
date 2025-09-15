'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import TopBar from '@/components/top-bar/top-bar';
import { appRoutes } from '@/constants/routes/app-routes';
import { clientApiService } from '@/services/api/client';
import Modal from '@/components/modal/modal';
import ClientForm from '@/components/client-form/client-form';
import { TLocation } from '@/components/google-maps/google-map';

import './styles.scss';

export default function NewClients() {
  const router = useRouter();
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const handleSubmit = async (data: any, location: TLocation) => {
    try {
      const { status } = await clientApiService.createClient(data);

      if (status === 'success') {
        router.push(appRoutes.clients.index);
      } else {
        setErrorModalOpen(true);
      }
    } catch (error) {
      setErrorModalOpen(true);
      console.error('Error creating client:', error);
    }
  };

  return (
    <section className="new-clients-page">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.clients.index}
        title="Add client"
      />

      <div className="content">
        <ClientForm
          submitButtonText="Submit"
          onSubmit={handleSubmit}
        />
      </div>

      <Modal
        className="warning"
        icon="error"
        title="Error"
        description="An error occurred while trying to create a new client. Please try again or verify the values you are inputting."
        isOpen={errorModalOpen}
        primaryText='Try again'
        primaryClick={() => setErrorModalOpen(false)}
      />
    </section>
  );
}
