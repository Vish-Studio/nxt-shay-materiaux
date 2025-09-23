'use client';

import ButtonCard from '@/components/button-card/button-card';
import Button from '@/components/button/button';
import ButtonCalendar from '@/components/calendar/button-calendar';
import Profile from '@/components/profile/profile';
import SearchBar from '@/components/search-bar/search-bar';
import SearchResults from '@/components/search-results/search-results';
import Sidebar from '@/components/sidebar/sidebar';
import { SearchItem } from '@/components/search-results/type/search-results-props';
import { appRoutes } from '@/constants/routes/app-routes';
import { SearchContext } from '@/context/SearchContext';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { clientApiService } from '@/services/api/client';
import { productApiService } from '@/services/api/product';
import { IClient } from '@/types/api/client';
import { IProduct } from '@/types/api/product';
import vish from '@/public/vish.jpg';

import { useState, useMemo } from 'react';
import dayjs from 'dayjs';

import './styles.scss';
import FabTabBar from '@/components/fab-tab-bar/FabTabBar';

export default function Home() {
  // Tab state: 0 = Overview, 1 = Credits
  const [activeTab, setActiveTab] = useState(0);
  // 1: on start get current date to display on calendar card.
  // 2: fetch data from that date.
  // 3: add data to different card elements.
  // 4: search - on edit text, hide card buttons and show search results.
  const [searchResults, setSearchResults] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch clients and products data
  const { data: clientsData, loading: clientsLoading } = useApiFetch<IClient[]>({
    serviceFn: clientApiService.getClients
  });

  const { data: productsData, loading: productsLoading } = useApiFetch<IProduct[]>({
    serviceFn: productApiService.getProducts
  });

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return { day, month };
  };

  // Transform API data into SearchItem format
  const searchItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // Add clients to search items
    if (clientsData) {
      clientsData.forEach(client => {
        items.push({
          id: client._id || '',
          title: `${client.firstName} ${client.lastName}`,
          subTitle: client.mobileNumber || client.phoneNumber || 'No phone',
          type: 'clients',
          icon: 'account_circle'
        });
      });
    }

    // Add products to search items
    if (productsData) {
      productsData.forEach(product => {
        items.push({
          id: product._id,
          title: product.name,
          subTitle: `${product.quantity} pieces`,
          type: 'products',
          icon: 'inventory_2'
        });
      });
    }

    return items;
  }, [clientsData, productsData]);

  // Transform client and product data for today's calendar schedules
  const todaySchedules = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const schedules: Array<{
      title: string;
      time: string;
      color: 'client' | 'product';
    }> = [];

    // Add clients with credit due today
    if (clientsData) {
      const clientsWithCreditDue = clientsData.filter(
        client => client.credit?.dueDateTime &&
          dayjs(client.credit.dueDateTime).format('YYYY-MM-DD') === today
      );

      clientsWithCreditDue.forEach(client => {
        schedules.push({
          title: `${client.firstName} ${client.lastName}`,
          time: client.credit?.amount ? `$${client.credit.amount.toFixed(2)}` : '$0.00',
          color: 'client' as const
        });
      });
    }

    // Add products with delivery today
    if (productsData) {
      const productsWithDeliveryToday = productsData.filter(
        product => product.deliveryDate &&
          dayjs(product.deliveryDate).format('YYYY-MM-DD') === today
      );

      productsWithDeliveryToday.forEach(product => {
        schedules.push({
          title: product.name,
          time: `$${product.buyingPrice.toFixed(2)}`,
          color: 'product' as const
        });
      });
    }

    return { data: schedules };
  }, [clientsData, productsData]);

  const data = searchItems.filter(
    (item) => {
      const searchTerm = searchResults.toLowerCase().trim();
      return (
        item?.title.toLowerCase().includes(searchTerm) ||
        item?.subTitle.toLowerCase().includes(searchTerm) ||
        item?.type.toLowerCase().includes(searchTerm)
      );
    }
  );
  console.log('test', todaySchedules)

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults
      }}
    >
      <section className="dashboard-content">
        <div className="app-bar">
          <div className="menu-bar">
            <h1>Dashboard</h1>

            <Profile
              name="Vishroy"
              imgUrl={vish}
              onClick={() => setSidebarOpen(true)}
            />
          </div>
          <div>
            <SearchBar hintText="Search" />
          </div>
        </div>

        <div className="container">
          {searchResults.length > 0 ? (
            <SearchResults items={data} />
          ) : (
            <>
              {activeTab === 0 && (
                <>
                  <ButtonCalendar
                    date={getDate()}
                    items={todaySchedules}
                    dataLoaded={!clientsLoading && !productsLoading}
                    showContent={!clientsLoading && !productsLoading}
                  />
                  <div className="overview">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                      <ButtonCard
                        title="Clients"
                        iconName="account_circle"
                        numTotal={clientsData?.length?.toString() || "0"}
                        numTotalTxt="total clients"
                        redirect={appRoutes.clients.index}
                        fabRedirect={appRoutes.clients.new}
                        dataLoaded={true}
                        showContent={!clientsLoading}
                        className="delay-1"
                      />
                      <Button
                        title="Catalogs"
                        iconName="import_contacts"
                        variant="rounded"
                        titleBold={false}
                        dataLoaded={true}
                        showContent={!clientsLoading}
                        className="delay-1"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                      <ButtonCard
                        className="yellow delay-2"
                        title="Products"
                        iconName="inventory_2"
                        numTotal={productsData?.length?.toString() || "0"}
                        numTotalTxt="total products"
                        redirect={appRoutes.products.index}
                        fabRedirect={appRoutes.products.new}
                        dataLoaded={true}
                        showContent={!productsLoading}
                      />
                      <Button
                        title="Invoices"
                        iconName="description"
                        variant="rounded"
                        titleBold={false}
                        dataLoaded={true}
                        showContent={!productsLoading}
                        className="delay-2"
                      />
                    </div>
                  </div>
                </>
              )}
              {activeTab === 1 && (
                <div className="credits-tab-content">
                  <h2>Credits</h2>
                  <p>Show your credits or alternate dashboard content here.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating action/tab bar */}
        <FabTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </section>
    </SearchContext.Provider>
  );
}
