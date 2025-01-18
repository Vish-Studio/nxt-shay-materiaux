import { GENERIC_SERVER_ERROR } from '@/constants/global';
import type { TBody, TError, IApiResponse, TFetchMethod } from '@/types/api/base';

import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

interface IApiService {
  post<T>(endpoint: string, body: TBody): Promise<IApiResponse<T>>;
  get<T>(endpoint: string): Promise<IApiResponse<T>>;
  put<T>(endpoint: string, body: TBody): Promise<IApiResponse<T>>;
  delete<T>(endpoint: string, body?: TBody): Promise<IApiResponse<T>>;
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

  private async request<T>(
    method: TFetchMethod,
    endpoint: string,
    body?: TBody
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

  public post<T>(endpoint: string, body: TBody): Promise<IApiResponse<T>> {
    return this.request<T>('post', endpoint, body);
  }

  public get<T>(endpoint: string): Promise<IApiResponse<T>> {
    return this.request<T>('get', endpoint);
  }

  public put<T>(endpoint: string, body: TBody): Promise<IApiResponse<T>> {
    return this.request<T>('put', endpoint, body);
  }

  public delete<T>(endpoint: string, body?: TBody): Promise<IApiResponse<T>> {
    return this.request<T>('delete', endpoint, body);
  }
}

export const api = new ApiService();
