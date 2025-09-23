'use client';

import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useEffect, useState } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';

import { appRoutes } from '@/constants/routes/app-routes';
import { IClient } from '@/types/api/client';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { clientApiService } from '@/services/api/client';
import { IColumn, TableListV2 } from '@/components/table/table-list-v2/table-list-v2';
import { getDayOfWeek, isToday } from '@/utils/date';
import TableFilter, { TabItem, SortOption } from '@/components/table/table-filter/table-filter';
import BriefCard from '@/components/brief-card/brief-card';
import BriefItem from '@/components/brief-card/brief-item/brief-item';

export default function Clients() {
  const [searchResults, setSearchResults] = useState('');
  const [filteredClients, setFilteredClients] = useState<IClient[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const router = useRouter();

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const { data: clientsData, loading: clientsDataLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });

  // Filter and sort clients based on search, payment status, and sort options
  useEffect(() => {
    if (!clientsData) {
      setFilteredClients(null);
      return;
    }

    let filtered = [...clientsData];

    // Apply search filter
    if (searchResults) {
      filtered = filtered.filter((client) =>
        client.firstName.toLowerCase().includes(searchResults.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchResults.toLowerCase())
      );
    }

    // Apply payment status filter
    if (activeFilter === 'paid') {
      filtered = filtered.filter((client) => !client.credit);
    } else if (activeFilter === 'unpaid') {
      filtered = filtered.filter((client) => client.credit);
    }
    // 'all' filter shows everything, no additional filtering needed

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortField === 'firstName') {
        aValue = a.firstName?.toLowerCase() || '';
        bValue = b.firstName?.toLowerCase() || '';
      } else if (sortField === 'createdAt') {
        aValue = new Date(a.createdAt || 0).getTime();
        bValue = new Date(b.createdAt || 0).getTime();
      } else {
        aValue = a[sortField as keyof IClient] || '';
        bValue = b[sortField as keyof IClient] || '';
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    setFilteredClients(filtered);
  }, [searchResults, clientsData, activeFilter, sortField, sortDirection]);

  // Calculate stats for brief card
  const totalClients = clientsData?.length || 0;
  const paidClients = clientsData?.filter((client: IClient) => !client.credit)?.length || 0;
  const unpaidClients = clientsData?.filter((client: IClient) => client.credit)?.length || 0;
  const addedToday = clientsData?.filter((client: IClient) => isToday(client.createdAt))?.length || 0;

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
      clickHandle: () => setActiveFilter('all')
    },
    {
      title: 'Paid',
      clickHandle: () => setActiveFilter('paid')
    },
    {
      title: 'Unpaid',
      clickHandle: () => setActiveFilter('unpaid')
    }
  ];

  const clientSortOptions: SortOption[] = [
    { label: 'Name Asc', value: 'firstName_asc', icon: 'arrow_downward' },
    { label: 'Name Desc', value: 'firstName_desc', icon: 'arrow_upward' },
    { label: 'Newly created', value: 'createdAt_desc', icon: 'arrow_downward' },
    { label: 'Oldest created', value: 'createdAt_asc', icon: 'arrow_upward' },
  ];


  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults
      }}
    >
      <div className={`page-clients ${clientsDataLoading ? 'loading-page' : ''}`}>
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={'/'}
          title="Clients"
          titleCenter
          hasSearch
        />

        <section className="overview">
          <BriefCard type='clients'>
            {clientsDataLoading ? (
              <>
                <BriefItem title="loading..." value="---" />
                <BriefItem title="loading..." value="---" />
                <BriefItem title="loading..." value="---" />
                <BriefItem title="loading..." value="---" />
              </>
            ) : (
              <>
                <BriefItem title="Created today" value={addedToday} />
                <BriefItem title="Total registered" value={totalClients} />
                <BriefItem title="Remaining payment" value={unpaidClients} />
                <BriefItem title="Total payment" value={paidClients} />
              </>
            )}
          </BriefCard>
        </section>

        <section className="main-content">
          <TableFilter
            tabItems={tabItem}
            defaultActiveIndex={0}
            onSort={handleSort}
            currentSortField={sortField}
            currentSortDirection={sortDirection}
            sortOptions={clientSortOptions}
          />

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
