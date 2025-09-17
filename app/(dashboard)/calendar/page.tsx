'use client';
import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useState, useEffect } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/constants/routes/app-routes';
import { clientApiService } from '@/services/api/client';
import { productApiService } from '@/services/api/product';
import dayjs, { Dayjs } from 'dayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { IClient } from '@/types/api/client';
import type { IProduct } from '@/types/api/product';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Schedule from '@/components/calendar/schedule/schedule';
import ButtonIcon from '@/components/button-icon/button-icon';


export default function Calendar() {
  const [searchResults, setSearchResults] = useState('');
  const [clients, setClients] = useState<IClient[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const router = useRouter();

  // Fetch all clients and products on mount
  useEffect(() => {
    Promise.all([
      clientApiService.getClients(),
      productApiService.getProducts()
    ]).then(([clientsRes, productsRes]) => {
      setClients(clientsRes.data || []);
      setProducts(productsRes.data || []);
    });
  }, []);

  // Extract all credit due dates
  const creditDueDates = clients
    .map((c) => c.credit?.dueDateTime)
    .filter(Boolean)
    .map((d) => dayjs(d).format('YYYY-MM-DD'));

  // Extract all delivery dates
  const deliveryDates = products
    .map((p) => p.deliveryDate)
    .filter(Boolean)
    .map((d) => dayjs(d).format('YYYY-MM-DD'));

  // Filter clients and products for selected date
  const clientsForSelectedDate = clients.filter(
    (c) => c.credit?.dueDateTime && dayjs(c.credit.dueDateTime).format('YYYY-MM-DD') === selectedDate?.format('YYYY-MM-DD')
  );

  const productsForSelectedDate = products.filter(
    (p) => p.deliveryDate && dayjs(p.deliveryDate).format('YYYY-MM-DD') === selectedDate?.format('YYYY-MM-DD')
  );


  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults
      }}
    >
      <div className="page-calendar">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={'/'}
          title="Calendar"
          titleCenter={true}
          hasSearch={true}
        />

        <div className="main-content">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              value={selectedDate}
              onChange={setSelectedDate}
              slots={{
                day: (props) => {
                  const dateStr = props.day.format('YYYY-MM-DD');
                  const isCreditDue = creditDueDates.includes(dateStr);
                  const isDeliveryDate = deliveryDates.includes(dateStr);

                  // Priority: Credit due (red) over delivery (yellow)
                  const backgroundColor = isCreditDue ? '#ff2d55' : isDeliveryDate ? '#ffcc00' : undefined;
                  const color = (isCreditDue || isDeliveryDate) ? '#fff' : undefined;

                  return (
                    <PickersDay
                      {...props}
                      sx={backgroundColor ? {
                        backgroundColor: `${backgroundColor} !important`,
                        color: `${color} !important`,
                        '&:hover': {
                          backgroundColor: `${backgroundColor} !important`,
                        }
                      } : {}}
                    />
                  );
                }
              }}
            />
          </LocalizationProvider>

          <section className='schedules-list'>
            <div className="header">
              <div className="text">
                <h2>Reminders</h2>
                <p>You have {clientsForSelectedDate.length + productsForSelectedDate.length} reminders for this day.</p>
              </div>

              <div className="actions">
                <ButtonIcon
                  className='btn-sort'
                  icon='swap_vert'
                  onClick={() => { }}
                />

                <ButtonIcon
                  className='btn-filter'
                  icon='filter_list'
                  onClick={() => { }}
                />
              </div>
            </div>

            <div className="schedules">
              {clientsForSelectedDate.length === 0 && productsForSelectedDate.length === 0 ? (
                <Schedule isEmpty />
              ) : (
                <>
                  {clientsForSelectedDate.map((client) => (
                    <Schedule
                      key={`client-${client._id}`}
                      onClick={() => router.push(appRoutes.clients.detail(client._id || ''))}
                      title={`${client.firstName} ${client.lastName}`}
                      time={client.credit?.amount ? `$${client.credit.amount.toFixed(2)}` : '$0.00'}
                      color="client"
                      restrictLength={true}
                      isMainComp
                      className="schedule-hover"
                    />
                  ))}
                  {productsForSelectedDate.map((product) => (
                    <Schedule
                      key={`product-${product._id}`}
                      onClick={() => router.push(appRoutes.products.detail(product._id))}
                      title={product.name}
                      time={`$${product.buyingPrice.toFixed(2)}`}
                      color="product"
                      restrictLength={true}
                      isMainComp
                      className="schedule-hover"
                    />
                  ))}
                </>
              )}
            </div>
          </section>
        </div>



        <ButtonFab
          icon={'add'}
          type={'normal'}
          clickHandler={() => router.push(appRoutes.calendar.new)}
        />
      </div>
    </SearchContext.Provider>
  );
}
