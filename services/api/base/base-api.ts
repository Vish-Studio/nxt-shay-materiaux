import { GENERIC_SERVER_ERROR } from '@/constants/global';
import type { TBody, TError, IApiResponse, TFetchMethod } from '@/types/api/base';

import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

interface IApiService {
  post<T, U = TBody>(endpoint: string, body: U): Promise<IApiResponse<T>>;
  get<T>(endpoint: string): Promise<IApiResponse<T>>;
  put<T, U = TBody>(endpoint: string, body: U): Promise<IApiResponse<T>>;
  delete<T, U = TBody>(endpoint: string, body?: U): Promise<IApiResponse<T>>;
}

class ApiService implements IApiService {
  public baseUrl: string;
  private readonly envBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;

  constructor() {
    this.baseUrl = this.envBaseUrl;
  }

  private formatResponse<T>(
    response: AxiosResponse<IApiResponse<T>> | AxiosError<TError>
  ): IApiResponse<T> {
    if (axios.isAxiosError(response)) {
      return {
        status: 'error',
        message: response.response?.data.message ?? response.message,
        statusCode: response.response?.status ?? 500,
        data: (response.response?.data as T) || null
      };
    }

    return response.data;
  }

  private handleError<T>(error: unknown): IApiResponse<T> {
    if (axios.isAxiosError(error)) {
      return this.formatResponse<T>(error);
    }

    return {
      status: 'error',
      message: GENERIC_SERVER_ERROR,
      statusCode: 500,
      data: null
    };
  }

  private async request<T, U>(
    method: TFetchMethod,
    endpoint: string,
    body?: U
  ): Promise<IApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const config = body ? { data: body } : {};
      const response: AxiosResponse = await axios({ method, url, ...config });
      return this.formatResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  public post<T, U = TBody>(endpoint: string, body: U): Promise<IApiResponse<T>> {
    return this.request<T, U>('post', endpoint, body);
  }

  public get<T>(endpoint: string): Promise<IApiResponse<T>> {
    return this.request<T, undefined>('get', endpoint);
  }

  public put<T, U = TBody>(endpoint: string, body: U): Promise<IApiResponse<T>> {
    return this.request<T, U>('put', endpoint, body);
  }

  public delete<T, U = TBody>(endpoint: string, body?: U): Promise<IApiResponse<T>> {
    return this.request<T, U>('delete', endpoint, body);
  }
}

export const api = new ApiService();
