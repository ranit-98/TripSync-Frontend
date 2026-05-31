import type { IUser } from "./users.interface";

export type IAuthData = IUser;

export interface IAuthTokenData {
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
