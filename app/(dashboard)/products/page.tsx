'use client';

import { useState } from 'react';

import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import TableFilter, { TabItem } from '@/components/table/table-filter/table-filter';
import { useApiFetch } from '@/hooks/use-api-fetch';
import type { IProduct } from '@/types/api/product';
import { type IColumn, TableListV2 } from '@/components/table/table-list-v2/table-list-v2';
import TagPayment from '@/components/table/tag-payment/tag-payment';
import type { TPaymentStatusValues } from '@/types/payment-status';
import { productApiService } from '@/services/api/product';
import { getDayOfWeek } from '@/utils/date';

import './styles.scss';
import BriefCard from '@/components/brief-card/brief-card';
import BriefItem from '@/components/brief-card/brief-item/brief-item';
import { appRoutes } from '@/constants/routes/app-routes';
import { useRouter } from 'next/navigation';

export default function Products() {
  const router = useRouter();
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


  const tabItem: TabItem[] = [
    {
      title: 'All',
      clickHandle: () => { }
    },
    {
      title: 'Active',
      clickHandle: () => { }
    },
    {
      title: 'Inactive',
      clickHandle: () => { }
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

      <section className='overview'>
        <BriefCard type='products'>
          <BriefItem title="added today" value={productsData?.length || 0} />
          <BriefItem title="total registered" value={productsData?.length || 0} />
          <BriefItem title="remaining payment" value={productsData?.length || 0} />
          <BriefItem title="total payment" value={productsData?.length || 0} />
        </BriefCard>
      </section>

      <section className="main-content">
        <TableFilter tabItems={tabItem} />

        <TableListV2
          columns={columns}
          data={productsData ?? []}
          loading={productsDataLoading}
          hideHeader
          onRowClick={(record) => router.push(`${appRoutes.products.index}/${record?._id}`)}
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
