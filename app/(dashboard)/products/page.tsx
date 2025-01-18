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
import { IColumn, TableListV2 } from '@/components/table/table-list-v2/table-list-v2';
import { ICategory } from '@/types/api/category';

export default function Products() {
  const [slug, setSlug] = useState<string>('plasticbags');
  const [isInfo, setIsInfo] = useState<boolean>(false);

  const { data: productsData } = useApiFetch<IProduct[]>({ endpoint: apiRoutes.products.index });

  const columns: IColumn<IProduct>[] = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (value) => (value as ICategory)?.name
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (value) => (typeof value === 'number' ? `Rs ${value}` : '')
    }
  ];

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
        <TableListV2
          columns={columns}
          data={productsData ?? []}
          onRowClick={(record) => {
            console.log('Column clicked', record);
          }}
        />
      </section>

      <ButtonFab
        icon={'add'}
        type={'normal'}
        clickHandler={() => setIsInfo(!isInfo)}
      />
    </main>
  );
}
