import { useState, useEffect } from 'react';

import type { IApiResponse, TResponseStatus } from '@/types/api/base';

export interface IUseApiFetchOptions<T> {
  serviceFn: () => Promise<IApiResponse<T>>;
}

export const useApiFetch = <T>({ serviceFn }: IUseApiFetchOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<TResponseStatus>('pending');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await serviceFn();
        setData(response.data ?? null);
        setStatus('success');
      } catch (err: any) {
        setStatus('error');
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceFn]);

  return { data, status, loading, error };
};
