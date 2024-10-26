import axios from 'axios';

class ApiService {
  public baseUrl: string;
  private envBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;

  constructor() {
    this.baseUrl = this.envBaseUrl;
  }

  public async post(endpoint: string, body: { [key: string]: string }) {
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
}

export const api = new ApiService();
