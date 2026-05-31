"use client";

import { chatAttachFn, chatDeleteFn, chatHistoryFn, chatSendFn } from "@/api/functions/chat";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useChatHistory = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.chat.messages, tripId],
    queryFn: () => chatHistoryFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useChatSend = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.chat.messages, "send"],
    mutationFn: chatSendFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useChatAttach = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.chat.attachments],
    mutationFn: chatAttachFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useChatDelete = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.chat.messages, "delete"],
    mutationFn: chatDeleteFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
