'use client';
import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/constants/routes/app-routes';


export default function CalendarNew() {
  const [searchResults, setSearchResults] = useState('');
  const router = useRouter();


  return (
    <div className='calendar-new'>
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={appRoutes.calendar.index}
        title="Add calendar"
      />

      <section>
        New Calendar
      </section>
    </div>
  );
}
