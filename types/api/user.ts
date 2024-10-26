export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age?: number;
  phone?: string;
}

export type UserAuthenticateBodyParams = {
  email: string;
  password: string;
};
