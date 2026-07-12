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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const updateCachedNotifications = (
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (notifications: Array<{ id: string; readAt?: string | null }>) => Array<{ id: string; readAt?: string | null }>,
) => {
  queryClient.setQueriesData({ queryKey: [listOfQueryKeys.notifications.list] }, (current) => {
    if (!current || typeof current !== "object") return current;

    const response = current as { data?: { data?: unknown } };
    if (!Array.isArray(response.data?.data)) return current;

    return {
      ...response,
      data: {
        ...response.data,
        data: updater(response.data.data as Array<{ id: string; readAt?: string | null }>),
      },
    };
  });
};

export const useNotificationsList = (search = "", category = "all", page = 1) => {
  return useQuery({
    queryKey: [listOfQueryKeys.notifications.list, search.trim(), category, page],
    queryFn: () => notificationsListFn({ search: search.trim(), category, page }),
  });
};

export const useNotificationsReadAll = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.notifications.readAll],
    mutationFn: notificationsReadAllFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        updateCachedNotifications(queryClient, (notifications) =>
          notifications.map((notification) => ({ ...notification, readAt: new Date().toISOString() }))
        );
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.notifications.list] });
        optionalCallback();
      }
    },
  });
};

export const useNotificationsRead = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.notifications.read],
    mutationFn: notificationsReadFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        updateCachedNotifications(queryClient, (notifications) =>
          notifications.map((notification) =>
            notification.id === variables.notificationId
              ? { ...notification, readAt: new Date().toISOString() }
              : notification
          )
        );
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.notifications.list] });
        optionalCallback();
      }
    },
  });
};

export const useNotificationsDelete = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.notifications.list, "delete"],
    mutationFn: notificationsDeleteFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        updateCachedNotifications(queryClient, (notifications) =>
          notifications.filter((notification) => notification.id !== variables.notificationId)
        );
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.notifications.list] });
        optionalCallback();
      }
    },
  });
};
