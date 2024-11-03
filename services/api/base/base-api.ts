import { GENERIC_SERVER_ERROR } from '@/constants/global';
import type { TBody, TResponse } from '@/types/api/base';

import type { AxiosResponse } from 'axios';
import axios from 'axios';

const formatResponse = (response: AxiosResponse) => {
  return {
    data: response.data,
    status: response.status
  };
};

interface IApiService {
  post(endpoint: string, body: TBody): Promise<any>;
  get(endpoint: string): Promise<any>;
  put(endpoint: string, body: TBody): Promise<any>;
  delete(endpoint: string, body?: TBody): Promise<any>;
}

class ApiService implements IApiService {
  public baseUrl: string;
  private envBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  private readonly error: TResponse = {
    message: GENERIC_SERVER_ERROR,
    status: 500
  };

  constructor() {
    this.baseUrl = this.envBaseUrl;
  }

  public async post(endpoint: string, body: TBody): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.post(url, body);
      return formatResponse(response);
    } catch (error) {
      return this.error;
    }
  }

  public async get(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.get(url);
      return formatResponse(response);
    } catch (error) {
      return this.error;
    }
  }

  public async put(endpoint: string, body: TBody): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.put(url, body);
      return formatResponse(response);
    } catch (error) {
      return this.error;
    }
  }

  public async delete(endpoint: string, body?: TBody): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.delete(url, { data: body });
      return formatResponse(response);
    } catch (error) {
      return this.error;
    }
  }
}

export const api = new ApiService();
