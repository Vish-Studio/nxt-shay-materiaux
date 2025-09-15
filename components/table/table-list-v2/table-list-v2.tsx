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
  showStatusTag?: boolean; // New prop to control status tag display
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
  showStatusTag = true, // Default to true for backward compatibility
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
      >
        {showStatusTag && <TagPayment status={'unpaid'} />}
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
                  onClick={() => handleRowClick(record)}
                >
                  {showStatusTag && (
                    <TagPayment
                      status={
                        // Check if this is product data (has quantity field)
                        (record as any)?.quantity !== undefined
                          ? ((record as any)?.quantity > 0 ? 'paid' : 'unpaid') // Use paid for in-stock, unpaid for out-of-stock
                          : ((record as any)?.credit ? 'unpaid' : 'paid') // Original logic for clients
                      }
                    />
                  )}
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

            <div className="total-count">
              {data.length} total
            </div>
          </>
        )}
      </div>
    </div >
  );
};
