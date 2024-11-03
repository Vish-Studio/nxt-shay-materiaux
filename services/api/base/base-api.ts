import axios from 'axios';

type TBody = {
  [key: string]: string;
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

  constructor() {
    this.baseUrl = this.envBaseUrl;
  }

  public async post(endpoint: string, body: TBody): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.post(url, body);
      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      throw error;
    }
  }

  public async get(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.get(url);
      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      throw error;
    }
  }

  public async put(endpoint: string, body: TBody): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.put(url, body);
      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      throw error;
    }
  }

  public async delete(endpoint: string, body?: TBody): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await axios.delete(url, { data: body });
      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      throw error;
    }
  }
}

export const api = new ApiService();
