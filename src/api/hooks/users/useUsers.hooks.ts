"use client";

import { usersChangePasswordFn, usersMeFn, usersUpdateMeFn } from "@/api/functions/users";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUsersMe = () => {
  return useQuery({
    queryKey: [listOfQueryKeys.users.me],
    queryFn: usersMeFn,
  });
};

export const useUsersUpdateMe = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.users.updateMe],
    mutationFn: usersUpdateMeFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useUsersChangePassword = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.users.changePassword],
    mutationFn: usersChangePasswordFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
