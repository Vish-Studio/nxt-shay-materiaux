export type TBody = {
  [key: string]: string;
};

export type TError = {
  message: string;
};

export type TFetchMethod = 'get' | 'post' | 'put' | 'delete';

export type TResponseStatus = 'success' | 'fail' | 'error' | 'pending';

export interface IApiResponse<T = unknown> {
  status: TResponseStatus;
  message: string;
  statusCode: number;
  data?: T | null;
}
