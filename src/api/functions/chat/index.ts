//=======================================================>
// CHAT API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IAttachment,
  IBodyPayload,
  ICreateAttachmentPayload,
  ICreateMessagePayload,
  IMessage,
  IWithMessageId,
  IWithTripId,
} from "@/typescript/interface/api";

export const chatHistoryFn = async ({ tripId }: IWithTripId): ApiMutationResponse<IMessage[]> => {
  const res = await axiosInstance.get(endpoints.chat.history("v1", tripId));

  return res;
};

export const chatSendFn = async ({
  body,
  tripId,
}: IBodyPayload<ICreateMessagePayload> & IWithTripId): ApiMutationResponse<IMessage> => {
  const res = await axiosInstance.post(endpoints.chat.send("v1", tripId), body);

  return res;
};

export const chatAttachFn = async ({
  body,
  messageId,
  tripId,
}: IBodyPayload<ICreateAttachmentPayload> & IWithMessageId): ApiMutationResponse<IAttachment> => {
  const res = await axiosInstance.post(endpoints.chat.attach("v1", tripId, messageId), body);

  return res;
};

export const chatDeleteFn = async ({ messageId, tripId }: IWithMessageId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.chat.delete("v1", tripId, messageId));

  return res;
};
