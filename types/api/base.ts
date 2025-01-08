export type TBody = {
  [key: string]: string;
};

export type TError = {
  message: string;
};

export type TResponse<T = any> = {
  error: string | null;
  data: T | null;
  status: number;
};
