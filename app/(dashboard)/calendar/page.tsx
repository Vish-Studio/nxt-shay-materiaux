'use client';
import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useState } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/constants/routes/app-routes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Schedule from '@/components/calendar/schedule/schedule';


export default function Clients() {
  const [searchResults, setSearchResults] = useState('');
  const router = useRouter();


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
            <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
          </LocalizationProvider>

          <section className='schedules-list'>
            <div className="title">
              <h2>Schedules</h2>
            </div>

            <div className="schedules">
              <Schedule
                onClick={() => router.push(appRoutes.calendar.new)}
                title={"Delivery: Jack Wilder"}
                time={'08:00'}
                restrictLength={true}
                isMainComp
              />

              <Schedule
                onClick={() => router.push(appRoutes.calendar.new)}
                title={"Products: Plastic bags"}
                time={'08:00'}
                color='product'
                isMainComp
              />

              <Schedule
                onClick={() => router.push(appRoutes.calendar.new)}
                title={"Delivery: Jack Wilder"}
                time={'08:00'}
                restrictLength={true}
                isMainComp
              />

              <Schedule
                onClick={() => router.push(appRoutes.calendar.new)}
                title={"Payment: Jack Wilder"}
                time={'08:00'}
                color='payment'
                restrictLength={true}
                isMainComp
              />
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