import { useState, useEffect } from 'react';
import { type TFetchMethod, type IApiResponse, TResponseStatus } from '@/types/api/base';
import { api } from '@/services/api/base/base-api';

interface UseApiFetchOptions {
  endpoint: string;
  method?: TFetchMethod;
  body?: any;
}

export const useApiFetch = <T>({ endpoint, method = 'get', body }: UseApiFetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<TResponseStatus>('pending');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response: IApiResponse<T> = await api[method]<T>(endpoint, body);

        if (response.status === 'success') {
          setStatus(response.status);
          setData(response.data ?? null);
        } else {
          setStatus(response.status);
          setError(response.message || 'Failed to fetch data');
        }
      } catch (error) {
        setStatus('error');
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body]);

  return { data, status, loading, error };
};
