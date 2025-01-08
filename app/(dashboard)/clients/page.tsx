'use client';
import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import InfoCard from '@/components/info-card/info-card';
import { useEffect, useState } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';
import TableFilter, { TabItem } from '@/components/table/table-filter/table-filter';
import TableList from '@/components/table/table-list/table-list';
import { appRoutes } from '@/constants/routes/app-routes';
import { clientsApi } from '@/services/api/client';
import { IClient } from '@/types/api/client';

export default function Clients() {
  const [searchResults, setSearchResults] = useState('');
  const [slug, setSlug] = useState<string>('vishroy');
  const [clientsData, setClientsData] = useState<IClient[] | []>([]);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await clientsApi.getAllClients();
      setClientsData(clientsData.data ?? []);
    };

    fetchClients();
  }, []);

  const data = [
    {
      title: 'John Snow',
      brn: '#12234555',
      address: 'Kalimaye st, Calebasses',
      tel: '+23051234567',
      shop: 'Good Shop'
    }
  ];

  const tabGroup: TabItem[] = [
    {
      title: 'All',
      clickHandle: () => alert('test')
    },
    {
      title: 'Paid',
      clickHandle: () => alert('Paid')
    }
  ];

  const handleTableClick = () => {
    console.log(data);

    setIsInfo(!isInfo);
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
          redirectBackLink="/"
          title="Clients"
          hasSearch={true}
        />

        <section>
          <InfoCard
            route={slug}
            type="clients"
            infoContents={data}
            isInfo={isInfo}
          />
        </section>

        <section className="main-content">
          <TableFilter tabItems={tabGroup} />
          <TableList
            tableData={clientsData}
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
