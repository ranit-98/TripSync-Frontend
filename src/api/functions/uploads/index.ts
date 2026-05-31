//=======================================================>
// UPLOADS API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IBodyPayload,
  ISignedUpload,
  ISignUploadPayload,
  IWithTripId,
} from "@/typescript/interface/api";

export const uploadsSignFn = async ({
  body,
  tripId,
}: IBodyPayload<ISignUploadPayload> & IWithTripId): ApiMutationResponse<ISignedUpload> => {
  const res = await axiosInstance.post(endpoints.uploads.sign("v1", tripId), body);

  return res;
};
