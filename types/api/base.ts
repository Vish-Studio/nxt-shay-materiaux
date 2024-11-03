export type TBody = {
  [key: string]: string;
};

export type TResponse = {
  message?: string;
  data?: any;
  status: number;
};
