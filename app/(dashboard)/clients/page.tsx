'use client';
import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import InfoCard from '@/components/info-card/info-card';
import { useState } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';

import TableList from '@/components/table/table-list/table-list';
import { appRoutes } from '@/constants/routes/app-routes';
import { IClient } from '@/types/api/client';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { clientApiService } from '@/services/api/client';
import { IColumn, TableListV2 } from '@/components/table/table-list-v2/table-list-v2';
import TagPayment from '@/components/table/tag-payment/tag-payment';
import { IProduct } from '@/types/api/product';
import { TPaymentStatusValues } from '@/types/payment-status';
import { getDayOfWeek } from '@/utils/date';
import TableFilter, { TabItem } from '@/components/table/table-filter/table-filter';

export default function Clients() {
  const [searchResults, setSearchResults] = useState('');
  const [selectedClient, setSelectedClient] = useState<IClient>(Object);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const router = useRouter();

  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });

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
      render: (value) => <span className="text-secondary">{`${value as number}`}</span>
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

  const handleTableClick = (data: IClient) => {
    let client: IClient = {
      firstName: data.firstName,
      lastName: data.lastName,
      nid: data.nid,
      brnNumber: data.brnNumber,
      phoneNumber: data.phoneNumber,
      deliveryDateTime: data.deliveryDateTime,
      paymentType: 'cash'
    };

    setIsInfo(!isInfo);
    setSelectedClient(client);
  };

  const tabItem: TabItem[] = [
    {
      title: 'All',
      clickHandle: () => {}
    },
    {
      title: 'Active',
      clickHandle: () => {}
    },
    {
      title: 'Inactive',
      clickHandle: () => {}
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
            data={clientsData ?? []}
            loading={clientsDataLoading}
            hideHeader
            onRowClick={(record) => {
              console.log('Column clicked', record);
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
