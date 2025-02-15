'use client';

import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import InfoCard from '@/components/info-card/info-card';
import { useEffect, useState } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';

import { appRoutes } from '@/constants/routes/app-routes';
import { IClient } from '@/types/api/client';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { clientApiService } from '@/services/api/client';
import { IColumn, TableListV2 } from '@/components/table/table-list-v2/table-list-v2';
import { getDayOfWeek } from '@/utils/date';
import TableFilter, { TabItem } from '@/components/table/table-filter/table-filter';

export default function Clients() {
  const [searchResults, setSearchResults] = useState('');
  const [selectedClient, setSelectedClient] = useState<IClient>(Object);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [filteredClients, setFilteredClients] = useState<IClient[] | null>(null);
  const router = useRouter();

  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });

  useEffect(() => {
    setFilteredClients(clientsData);
  }, [clientsData]);

  useEffect(() => {
    if (searchResults) {
      const filtered = clientsData?.filter((client) =>
        client.firstName.toLowerCase().includes(searchResults.toLowerCase())
      );
      setFilteredClients(filtered ?? null);
    } else {
      setFilteredClients(clientsData);
    }
  }, [searchResults, clientsData]);

  const columns: IColumn<IClient>[] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      className: 'firstName',
      render: (value) => <span className="text-muted">{value as string}</span>
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      className: 'lastName',
      render: (value) => <span className="text-muted">{value as string}</span>
    },
    {
      title: 'Phone',
      dataIndex: 'mobileNumber',
      className: 'mobileNumber',
      render: (value) => <span className="text-secondary">{`${value as string}`}</span>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      className: 'date',
      render: (value) => {
        const dayOfWeek = getDayOfWeek(value as string);
        return <span className="text-secondary">{dayOfWeek}</span>;
      }
    }
  ];

  const tabItem: TabItem[] = [
    {
      title: 'All',
      clickHandle: () => { }
    },
    {
      title: 'Active',
      clickHandle: () => { }
    },
    {
      title: 'Inactive',
      clickHandle: () => { }
    }
  ];

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
          <TableFilter tabItems={tabItem} />

          <TableListV2
            columns={columns}
            data={filteredClients ?? []}
            loading={clientsDataLoading}
            hideHeader
            onRowClick={(record) => {
              router.push(`${appRoutes.clients.index}/${record?._id}`);
            }}
            containerClassName="clients-table-list"
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
