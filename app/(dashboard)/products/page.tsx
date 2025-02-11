'use client';

import { useState } from 'react';

import ButtonFab from '@/components/button-fab/button-fab';
import InfoCard from '@/components/info-card/info-card';
import TopBar from '@/components/top-bar/top-bar';
import TableFilter from '@/components/table/table-filter/table-filter';
import TableList from '@/components/table/table-list/table-list';
import { useApiFetch } from '@/hooks/use-api-fetch';
import type { IProduct } from '@/types/api/product';
import { type IColumn, TableListV2 } from '@/components/table/table-list-v2/table-list-v2';
import TagPayment from '@/components/table/tag-payment/tag-payment';
import type { TPaymentStatusValues } from '@/types/payment-status';
import { productApiService } from '@/services/api/product';
import { getDayOfWeek } from '@/utils/date';

import './styles.scss';

export default function Products() {
  const [slug, setSlug] = useState<string>('plasticbags');
  const [isInfo, setIsInfo] = useState<boolean>(false);

  const { data: productsData, loading: productsDataLoading } = useApiFetch<IProduct[]>({
    serviceFn: productApiService.getProducts
  });

  const columns: IColumn<IProduct>[] = [
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      className: 'status',
      render: (value) => {
        return <TagPayment status={value?.toString() as TPaymentStatusValues} />;
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'name',
      render: (value) => <span className="text-muted">{value as string}</span>
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      className: 'quantity',
      render: (value) => <span className="text-secondary">{`${value as number} pieces`}</span>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      className: 'date',
      render: (value) => {
        const dayOfWeek = getDayOfWeek(value as string);
        return <span className="text-secondary">{dayOfWeek}</span>;
      }
    }
  ];

  // This is for testing purpose only
  const AddProductTest = () => {
    const testAdd = () => {
      productApiService.createProduct({
        name: 'Test Product',
        quantity: 100,
        category: '678ac6dddb99f228bc59538c',
        price: 1000,
        buyingPrice: 800,
        paymentStatus: 'paid'
      });
    };

    return <button onClick={testAdd}>Add Product TEST</button>;
  };

  return (
    <main className="page-products">
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink="/"
        title="Products"
        hasSearch={true}
      />

      <section>
        <InfoCard
          type="products"
          isInfo={isInfo}
        />
      </section>

      <section className="main-content">
        <TableListV2
          columns={columns}
          data={productsData ?? []}
          loading={productsDataLoading}
          hideHeader
          onRowClick={(record) => {
            console.log('Column clicked', record);
          }}
          containerClassName="products-table-list"
        />

        <AddProductTest />
      </section>

      <ButtonFab
        icon={'add'}
        type={'normal'}
        clickHandler={() => setIsInfo(!isInfo)}
      />
    </main>
  );
}
