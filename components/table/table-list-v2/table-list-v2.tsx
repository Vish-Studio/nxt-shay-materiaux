import React, { useCallback, useState } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';

import { renderValidReactNode } from '@/utils/react';

import './styles.scss';

export interface IColumn<T> {
  title: string;
  dataIndex: keyof T;
  className?: string;
  render?: (value: T[keyof T], record: T) => ReactNode;
}

interface ITableListV2Props<T> extends HTMLAttributes<HTMLDivElement> {
  columns: IColumn<T>[];
  data: T[];
  hideHeader?: boolean;
  onRowClick?: (record: T) => void;
  containerClassName?: string;
  rowClassName?: string;
  headerClassName?: string;
}

export const TableListV2 = <T,>({
  columns,
  data,
  hideHeader,
  onRowClick,
  containerClassName,
  rowClassName,
  headerClassName,
  ...rest
}: ITableListV2Props<T>) => {
  const [selectedRecord, setSelectedRecord] = useState<T | null>(null);

  const generateKey = (record: T) => JSON.stringify(record);

  const handleRowClick = useCallback(
    (record: T) => {
      setSelectedRecord(record);
      onRowClick?.(record);
    },
    [onRowClick]
  );

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
        {data.map((record, _) => {
          const key = generateKey(record);

          return (
            <button
              key={key}
              className={`table-row ${rowClassName ?? ''} ${
                record === selectedRecord ? 'selected' : ''
              }`}
              onClick={() => handleRowClick(record)}
            >
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
      </div>
    </div>
  );
};
