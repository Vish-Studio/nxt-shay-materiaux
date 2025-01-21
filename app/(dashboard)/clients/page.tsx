'use client';
import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import InfoCard from '@/components/info-card/info-card';
import { useState } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';
import TableFilter, { TabItem } from '@/components/table/table-filter/table-filter';
import TableList from '@/components/table/table-list/table-list';
import { appRoutes } from '@/constants/routes/app-routes';
import { IClient } from '@/types/api/client';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { clientsApi } from '@/services/api/client';

export default function Clients() {
  const [searchResults, setSearchResults] = useState('');
  const [selectedClient, setSelectedClient] = useState<IClient>(Object);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const router = useRouter();

  const { data: clientsData } = useApiFetch<IClient[]>({ serviceFn: clientsApi.getAllClients });

  const handleTableClick = (data: IClient) => {
    let client: IClient = {
      firstName: data.firstName,
      lastName: data.lastName,
      nid: data.nid,
      createDateTime: data.createDateTime,
      brnNumber: data.brnNumber,
      phoneNumber: data.phoneNumber,
      deliveryDateTime: data.deliveryDateTime,
      paymentType: 'cash'
    };

    setIsInfo(!isInfo);
    setSelectedClient(client);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults
      }}
    >
      <div className="page-clients">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={'/'}
          title="Clients"
          hasSearch={true}
        />

        <InfoCard
          type="clients"
          infoContents={selectedClient}
          isInfo={isInfo}
        />

        <section className="main-content">
          <TableList
            tableData={clientsData ?? []}
            clickEvent={handleTableClick}
          />
        </section>

        <ButtonFab
          icon={'add'}
          type={'normal'}
          clickHandler={() => router.push(appRoutes.clients.new)}
        />
      </div>
    </SearchContext.Provider>
  );
}
