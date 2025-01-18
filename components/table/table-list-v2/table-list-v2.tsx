import React, { useCallback, useState } from 'react';
import type { ReactNode, TableHTMLAttributes } from 'react';

import { renderValidReactNode } from '@/utils/react';

import './styles.scss';

export interface IColumn<T> {
  title: string;
  dataIndex: keyof T;
  render?: (value: T[keyof T], record: T) => ReactNode;
}

interface ITableListV2Props<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: IColumn<T>[];
  data: T[];
  onRowClick?: (record: T) => void;
}

export const TableListV2 = <T,>(props: ITableListV2Props<T>) => {
  const { columns, data, onRowClick, ...rest } = props;

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
    <table
      className="table-list"
      {...rest}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.title}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, _) => {
          const key = generateKey(record);

          return (
            <tr
              key={key}
              className={record === selectedRecord ? 'selected' : ''}
              onClick={() => handleRowClick(record)}
            >
              {columns.map((column) => (
                <td key={column.dataIndex as string}>
                  {column.render
                    ? column.render(record[column.dataIndex], record)
                    : renderValidReactNode(record[column.dataIndex])}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
