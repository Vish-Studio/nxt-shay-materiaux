export interface IUser {
  _id: string;
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

export type UserMeBodyParams = {
  id: string;
};
