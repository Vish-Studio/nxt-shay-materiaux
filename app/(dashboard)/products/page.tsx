'use client';

import ButtonFab from '@/components/button-fab/button-fab';
import InfoCard from '@/components/info-card/info-card';
import TopBar from '@/components/top-bar/top-bar';
import { useState } from 'react';

import './styles.scss';
import TableFilter from '@/components/table/table-filter/table-filter';
import TableList from '@/components/table/table-list/table-list';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { IProduct } from '@/types/api/product';
import { apiRoutes } from '@/constants/routes/api-routes';

export default function Products() {
  const [slug, setSlug] = useState<string>('plasticbags');
  const [isInfo, setIsInfo] = useState<boolean>(false);

  const { data: productsData } = useApiFetch<IProduct[]>({ endpoint: apiRoutes.products.index });

  console.log(productsData);

  return (
    <main className="page-products">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink="/"
        title="Products"
        hasSearch={true}
      />

      {/* <section>
        <InfoCard
          type="products"
          isInfo={isInfo}
          infoContents={}
        />
      </section> */}

      <section className="main-content">
        {/* <TableList
          tableData={productsData ?? []}
          clickEvent={() => {}}
        /> */}
      </section>

      <ButtonFab
        icon={'add'}
        type={'normal'}
        clickHandler={() => setIsInfo(!isInfo)}
      />
    </main>
  );
}
