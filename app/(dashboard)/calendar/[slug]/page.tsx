'use client';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useRouter } from 'next/navigation';


export default function CalendarNew() {
  const router = useRouter();


  return (
    <section className='calendar-new'>
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink={'/'}
        title="Add calendar"
      />
      New Calendar
    </section>
  );
}
