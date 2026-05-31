"use client";

import {
  notificationsDeleteFn,
  notificationsListFn,
  notificationsReadAllFn,
  notificationsReadFn,
} from "@/api/functions/notifications";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNotificationsList = () => {
  return useQuery({
    queryKey: [listOfQueryKeys.notifications.list],
    queryFn: notificationsListFn,
  });
};

export const useNotificationsReadAll = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.notifications.readAll],
    mutationFn: notificationsReadAllFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useNotificationsRead = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.notifications.read],
    mutationFn: notificationsReadFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useNotificationsDelete = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.notifications.list, "delete"],
    mutationFn: notificationsDeleteFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
