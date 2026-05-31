//=======================================================>
// USERS API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IChangePasswordPayload,
  IUpdateUserPayload,
  IUser,
} from "@/typescript/interface/api";

export const usersMeFn = async (): ApiMutationResponse<IUser> => {
  const res = await axiosInstance.get(endpoints.users.me("v1"));

  return res;
};

export const usersUpdateMeFn = async (body: IUpdateUserPayload): ApiMutationResponse<IUser> => {
  const res = await axiosInstance.patch(endpoints.users.me("v1"), body);

  return res;
};

export const usersChangePasswordFn = async (body: IChangePasswordPayload): ApiMutationResponse => {
  const res = await axiosInstance.patch(endpoints.users.changePassword("v1"), body);

  return res;
};
