"use client";

import {
  usersChangePasswordFn,
  usersMeFn,
  usersSearchFn,
  usersUploadAvatarFn,
  usersUpdateMeFn,
} from "@/api/functions/users";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useAuthStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsersMe = () => {
  return useQuery({
    queryKey: [listOfQueryKeys.users.me],
    queryFn: usersMeFn,
  });
};

export const useUsersSearch = (query: string) => {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: [listOfQueryKeys.users.search, normalizedQuery],
    queryFn: () => usersSearchFn(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
  });
};

export const useUsersUpdateMe = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationKey: [listOfQueryKeys.users.updateMe],
    mutationFn: usersUpdateMeFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        if (res.data.data) {
          setAuthUser(res.data.data);
        }

        queryClient.setQueryData([listOfQueryKeys.users.me], res);
        queryClient.setQueryData([listOfQueryKeys.auth.me], res);
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.users.me] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.auth.me] });
        optionalCallback();
      }
    },
  });
};

export const useUsersUploadAvatar = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationKey: [listOfQueryKeys.users.avatarUpload],
    mutationFn: usersUploadAvatarFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        if (res.data.data) {
          setAuthUser(res.data.data);
        }

        queryClient.setQueryData([listOfQueryKeys.users.me], res);
        queryClient.setQueryData([listOfQueryKeys.auth.me], res);
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.users.me] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.auth.me] });
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
