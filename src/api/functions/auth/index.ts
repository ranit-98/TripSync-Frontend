//=======================================================>
// AUTH API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IAuthData,
  ILoginPayload,
  IRegisterPayload,
  IUser,
} from "@/typescript/interface/api";

export const authRegisterFn = async (body: IRegisterPayload): ApiMutationResponse<IAuthData> => {
  const res = await axiosInstance.post(endpoints.auth.register("v1"), body);

  return res;
};

export const authLoginFn = async (body: ILoginPayload): ApiMutationResponse<IAuthData> => {
  const res = await axiosInstance.post(endpoints.auth.login("v1"), body);

  return res;
};

export const authRefreshFn = async (): ApiMutationResponse<IAuthData> => {
  const res = await axiosInstance.post(endpoints.auth.refresh("v1"));

  return res;
};

export const authLogoutFn = async (): ApiMutationResponse => {
  const res = await axiosInstance.post(endpoints.auth.logout("v1"));

  return res;
};

export const authMeFn = async (): ApiMutationResponse<IUser> => {
  const res = await axiosInstance.get(endpoints.auth.me("v1"));

  return res;
};
