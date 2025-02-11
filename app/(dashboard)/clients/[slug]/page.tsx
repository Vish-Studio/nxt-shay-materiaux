'use client';

import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/constants/routes/app-routes';
import DetailCardHeader from '@/components/detail-card-header/detail-card-header';

export default function Client() {
  const router = useRouter();

  return (
    <main className="client-page">
      <div className="page-client-details">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes.clients.index}
          title="Client detail"
          hasSearch={false}
        />

        <div className="main-content">
          <section>
            <DetailCardHeader title={'Vishroy Seenarain'} icon='account_circle' />
          </section>
        </div>
      </div>
    </main>
  );
}
