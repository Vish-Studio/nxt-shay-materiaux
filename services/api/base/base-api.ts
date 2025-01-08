import { GENERIC_SERVER_ERROR } from '@/constants/global';
import type { TBody, TError, TResponse } from '@/types/api/base';

import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

const formatResponse = <T>(response: AxiosResponse<T> | AxiosError<TError>): TResponse<T> => {
  if (axios.isAxiosError(response)) {
    return {
      data: (response.response?.data as T) || null,
      status: response.response?.status ?? 500,
      error: response.response?.data.message ?? response.message
    };
  }

  return {
    data: response.data,
    status: response.status,
    error: null
  };
};

const handleError = <T>(error: unknown): TResponse<T> => {
  if (axios.isAxiosError(error)) {
    return formatResponse<T>(error);
  }

  return {
    data: null,
    status: 500,
    error: GENERIC_SERVER_ERROR
  };
};

interface IApiService {
  post<T>(endpoint: string, body: TBody): Promise<TResponse<T>>;
  get<T>(endpoint: string): Promise<TResponse<T>>;
  put<T>(endpoint: string, body: TBody): Promise<TResponse<T>>;
  delete<T>(endpoint: string, body?: TBody): Promise<TResponse<T>>;
}

class ApiService implements IApiService {
  public baseUrl: string;
  private readonly envBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;

  constructor() {
    this.baseUrl = this.envBaseUrl;
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    body?: TBody
  ): Promise<TResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const config = body ? { data: body } : {};
      const response: AxiosResponse = await axios({ method, url, ...config });
      return formatResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }

  public post<T>(endpoint: string, body: TBody): Promise<TResponse<T>> {
    return this.request<T>('post', endpoint, body);
  }

  public get<T>(endpoint: string): Promise<TResponse<T>> {
    return this.request<T>('get', endpoint);
  }

  public put<T>(endpoint: string, body: TBody): Promise<TResponse<T>> {
    return this.request<T>('put', endpoint, body);
  }

  public delete<T>(endpoint: string, body?: TBody): Promise<TResponse<T>> {
    return this.request<T>('delete', endpoint, body);
  }
}

export const api = new ApiService();
