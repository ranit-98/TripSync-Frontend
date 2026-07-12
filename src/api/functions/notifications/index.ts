//=======================================================>
// NOTIFICATIONS API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type { ApiMutationResponse, INotification, IPageParams, IWithNotificationId } from "@/typescript/interface/api";

export const notificationsListFn = async ({ page = 1, limit = 20, search = "", category = "all" }: IPageParams & { search?: string; category?: string } = {}): ApiMutationResponse<INotification[]> => {
  const res = await axiosInstance.get(endpoints.notifications.list("v1"), {
    params: { page, limit, search: search || undefined, category },
  });

  return res;
};

export const notificationsReadAllFn = async (): ApiMutationResponse => {
  const res = await axiosInstance.patch(endpoints.notifications.readAll("v1"));

  return res;
};

export const notificationsReadFn = async ({
  notificationId,
}: IWithNotificationId): ApiMutationResponse<INotification> => {
  const res = await axiosInstance.patch(endpoints.notifications.read("v1", notificationId));

  return res;
};

export const notificationsDeleteFn = async ({ notificationId }: IWithNotificationId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.notifications.delete("v1", notificationId));

  return res;
};
