'use client';

import ButtonFab from '@/components/button-fab/button-fab';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useEffect, useState } from 'react';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';

import { appRoutes } from '@/constants/routes/app-routes';
import { useApiFetch } from '@/hooks/use-api-fetch';
import type { IProduct } from '@/types/api/product';
import { type IColumn, TableListV2 } from '@/components/table/table-list-v2/table-list-v2';
import TagPayment from '@/components/table/tag-payment/tag-payment';
import StatusTag from '@/components/status-tag/status-tag';
import type { TPaymentStatusValues } from '@/types/payment-status';
import { productApiService } from '@/services/api/product';
import { getDayOfWeek, isToday } from '@/utils/date';
import TableFilter, { TabItem, SortOption } from '@/components/table/table-filter/table-filter';
import BriefCard from '@/components/brief-card/brief-card';
import BriefItem from '@/components/brief-card/brief-item/brief-item';

export default function Products() {
  const [searchResults, setSearchResults] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'paid' | 'unpaid'>('all'); // 'paid' = in stock, 'unpaid' = out of stock
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const router = useRouter();

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const { data: productsData, loading: productsDataLoading } = useApiFetch<IProduct[]>({
    serviceFn: productApiService.getProducts
  });

  // Filter and sort products based on search, payment status, and sort options
  useEffect(() => {
    if (!productsData) {
      setFilteredProducts(null);
      return;
    }

    let filtered = [...productsData];

    // Apply search filter
    if (searchResults) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchResults.toLowerCase())
      );
    }

    // Apply stock availability filter
    if (activeFilter === 'paid') {
      filtered = filtered.filter((product) => product.quantity > 0); // In stock
    } else if (activeFilter === 'unpaid') {
      filtered = filtered.filter((product) => product.quantity === 0); // Out of stock
    }
    // 'all' filter shows everything, no additional filtering needed

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortField === 'name') {
        aValue = a.name?.toLowerCase() || '';
        bValue = b.name?.toLowerCase() || '';
      } else if (sortField === 'createdAt') {
        aValue = new Date(a.createdAt || 0).getTime();
        bValue = new Date(b.createdAt || 0).getTime();
      } else if (sortField === 'quantity') {
        aValue = a.quantity || 0;
        bValue = b.quantity || 0;
      } else {
        aValue = a[sortField as keyof IProduct] || '';
        bValue = b[sortField as keyof IProduct] || '';
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchResults, productsData, activeFilter, sortField, sortDirection]);

  // Calculate stats for brief card
  const totalProducts = productsData?.length || 0;
  const inStockProducts = productsData?.filter((product: IProduct) => product.quantity > 0)?.length || 0;
  const outOfStockProducts = productsData?.filter((product: IProduct) => product.quantity === 0)?.length || 0;
  const addedToday = productsData?.filter((product: IProduct) => isToday(product.createdAt))?.length || 0;

  const columns: IColumn<IProduct>[] = [
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

  const tabItem: TabItem[] = [
    {
      title: 'All',
      clickHandle: () => setActiveFilter('all')
    },
    {
      title: 'In Stock',
      clickHandle: () => setActiveFilter('paid') // Using 'paid' to represent in-stock
    },
    {
      title: 'Out of Stock',
      clickHandle: () => setActiveFilter('unpaid') // Using 'unpaid' to represent out-of-stock
    }
  ];

  const productSortOptions: SortOption[] = [
    { label: 'Name Asc', value: 'name_asc', icon: 'arrow_downward' },
    { label: 'Name Desc', value: 'name_desc', icon: 'arrow_upward' },
    { label: 'Quantity Low to High', value: 'quantity_asc', icon: 'arrow_downward' },
    { label: 'Quantity High to Low', value: 'quantity_desc', icon: 'arrow_upward' },
    { label: 'Newly created', value: 'createdAt_desc', icon: 'arrow_downward' },
    { label: 'Oldest created', value: 'createdAt_asc', icon: 'arrow_upward' },
  ];


  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults
      }}
    >
      <div className={`page-products ${productsDataLoading ? 'loading-page' : ''}`}>
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink="/"
          title="Products"
          hasSearch={true}
        />

        <section className='overview'>
          <BriefCard type='products'>
            {productsDataLoading ? (
              <>
                <BriefItem title="loading..." value="---" />
                <BriefItem title="loading..." value="---" />
                <BriefItem title="loading..." value="---" />
                <BriefItem title="loading..." value="---" />
              </>
            ) : (
              <>
                <BriefItem title="Created today" value={addedToday} />
                <BriefItem title="Total registered" value={totalProducts} />
                <BriefItem title="Out of stock" value={outOfStockProducts} />
                <BriefItem title="In stock" value={inStockProducts} />
              </>
            )}
          </BriefCard>
        </section>

        <section className="main-content">
          <TableFilter
            tabItems={tabItem}
            defaultActiveIndex={0}
            onSort={handleSort}
            currentSortField={sortField}
            currentSortDirection={sortDirection}
            sortOptions={productSortOptions}
          />

          <TableListV2
            columns={columns}
            data={filteredProducts ?? []}
            loading={productsDataLoading}
            hideHeader
            onRowClick={(record) => {
              router.push(`${appRoutes.products.index}/${record?._id}`);
            }}
            containerClassName="products-table-list"
            showStatusTag={true}
          />
        </section>

        <ButtonFab
          icon={'add'}
          type={'normal'}
          clickHandler={() => router.push(appRoutes.products.new)}
        />
      </div>
    </SearchContext.Provider>
  );
}
