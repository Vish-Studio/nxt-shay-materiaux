
'use client';

import TopBar from '@/components/top-bar/top-bar';
// import './styles.scss';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/constants/routes/app-routes';
import DetailCardHeader from '@/components/detail-card-header/detail-card-header';

export default function Product() {
  const router = useRouter();

  return (
    <main className="product-page">
      <div className="page-product-details">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink={appRoutes?.products?.index}
          title="Client detail"
          hasSearch={false}
        />

        <div className="main-content">
          <section>
            <DetailCardHeader title={'A Product'} icon="inventory_2" />
          </section>
        </div>
      </div>
    </main>
  );
}
