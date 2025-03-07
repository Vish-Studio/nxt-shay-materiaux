'use client';

import ButtonCard from '@/components/button-card/button-card';
import Button from '@/components/button/button';
import ButtonCalendar from '@/components/calendar/button-calendar';
import Profile from '@/components/profile/profile';
import SearchBar from '@/components/search-bar/search-bar';
import SearchResults from '@/components/search-results/search-results';
import { SearchItem } from '@/components/search-results/type/search-results-props';
import { appRoutes } from '@/constants/routes/app-routes';
import { SearchContext } from '@/context/SearchContext';
import vish from '@/public/vish.jpg';

import { useState } from 'react';

import './styles.scss';

export default function Home() {
  // 1: on start get current date to display on calendar card.
  // 2: fetch data from that date.
  // 3: add data to different card elements.
  // 4: search - on edit text, hide card buttons and show search results.
  const [searchResults, setSearchResults] = useState('');

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return { day, month };
  };

  let items: SearchItem[] = [
    { title: 'John Bennette', subTitle: '+230 5123 4567', type: 'clients', icon: 'account_circle' },
    { title: 'Cat featured plates', subTitle: '2 pieces', type: 'products', icon: 'inventory_2' },
    { title: 'Tim Cooked', subTitle: '+230 5123 4567', type: 'clients', icon: 'account_circle' },
    { title: 'Steve Rock', subTitle: '+230 5123 4567', type: 'clients', icon: 'account_circle' },
    { title: 'Ceramic coating', subTitle: '43 pieces', type: 'products', icon: 'inventory_2' }
  ];

  let data = items.filter(
    (item) =>
      item?.title.toLowerCase().includes(searchResults) ||
      item?.subTitle.toLowerCase().includes(searchResults)
  );

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
              <ButtonCalendar date={getDate()} />

              <div className="overview">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                >
                  <ButtonCard
                    title="Clients"
                    iconName="account_circle"
                    numTotal="200"
                    numTotalTxt="total clients"
                    redirect={appRoutes.clients.index}
                  />

                  <Button
                    title="Catalogs"
                    iconName="import_contacts"
                    variant="rounded"
                    titleBold={false}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                >
                  <ButtonCard
                    className="yellow"
                    title="Products"
                    iconName="inventory_2"
                    numTotal="550"
                    numTotalTxt="total products"
                    redirect={appRoutes.products.index}
                  />
                  <Button
                    title="Invoices"
                    iconName="description"
                    variant="rounded"
                    titleBold={false}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </SearchContext.Provider>
  );
}
