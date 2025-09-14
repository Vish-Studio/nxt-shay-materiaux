import React, { useCallback, useState, useEffect } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';

import { renderValidReactNode } from '@/utils/react';
import { LinearProgress } from '@/components/linear-progress/linear-progress';

import './styles.scss';
import { useRouter } from 'next/navigation';
import TagPayment from '../tag-payment/tag-payment';

export interface IColumn<T> {
  title: string;
  dataIndex: keyof T;
  className?: string;
  render?: (value: T[keyof T], record: T) => ReactNode;
}

interface IRecordWithId {
  _id: string;
}

interface ITableListV2Props<T> extends HTMLAttributes<HTMLDivElement> {
  columns: IColumn<T>[];
  data: T[];
  loading?: boolean;
  hideHeader?: boolean;
  onRowClick?: (record: T) => void;
  containerClassName?: string;
  rowClassName?: string;
  headerClassName?: string;
}

export const TableListV2 = <T,>({
  columns,
  data,
  loading,
  hideHeader,
  onRowClick,
  containerClassName,
  rowClassName,
  headerClassName,
  ...rest
}: ITableListV2Props<T>) => {
  const [selectedRecord, setSelectedRecord] = useState<T | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShowSkeleton(true);
    }
    else {
      // Delay hiding skeleton to allow for smooth transition
      const timer = setTimeout(() => setShowSkeleton(false), 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const generateKey = (record: T) => JSON.stringify(record);

  const handleRowClick = useCallback(
    (record: T) => {
      setSelectedRecord(record);
      onRowClick?.(record);
    },
    [onRowClick]
  );

  // Create skeleton rows for loading state
  const createSkeletonRows = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={`skeleton-${index}`}
        className={`table-row loading-skeleton ${rowClassName ?? ''}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <TagPayment status={'unpaid'} style={{ marginRight: '8px', opacity: 0.7 }} />

        {columns.map((column) => (
          <div
            key={`skeleton-cell-${column.dataIndex as string}`}
            className={`table-cell ${column.className ?? ''}`}
          >
            Placeholder text
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div
      className={`table-container ${containerClassName ?? ''}`}
      {...rest}
    >
      {!hideHeader && (
        <div className={`table-header ${headerClassName ?? ''}`}>
          {columns.map((column) => (
            <div
              key={column.title}
              className={`table-header-cell ${column.className ?? ''}`}
            >
              {column.title}
            </div>
          ))}
        </div>
      )}
      <div className="table-body">
        {loading && showSkeleton ? (
          createSkeletonRows()
        ) : (
          <>
            {data.map((record, index) => {
              const key = generateKey(record);

              return (
                <button
                  key={key}
                  className={`table-row table-row-animated ${rowClassName ?? ''} ${record === selectedRecord ? 'selected' : ''
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleRowClick(record)}
                >
                  <TagPayment
                    status={(record as any)?.credit ? 'unpaid' : 'paid'}
                    style={{ marginRight: '8px' }}
                  />

                  {columns.map((column) => (
                    <div
                      key={column.dataIndex as string}
                      className={`table-cell ${column.className ?? ''}`}
                    >
                      {column.render
                        ? column.render(record[column.dataIndex], record)
                        : renderValidReactNode(record[column.dataIndex])}
                    </div>
                  ))}
                </button>
              );
            })}

            <div style={{
              textAlign: 'center', marginTop: '1rem', opacity: '0.3',
              fontSize: '12px'
            }}>
              {data.length} total clients
            </div>
          </>
        )}
      </div>
    </div >
  );
};
