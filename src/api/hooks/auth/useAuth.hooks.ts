"use client";

import {
  authLoginFn,
  authLogoutFn,
  authMeFn,
  authRefreshFn,
  authRegisterFn,
} from "@/api/functions/auth";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useAuthStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAuthRegister = ({ optionalCallback }: IMutationHookOptions) => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationKey: [listOfQueryKeys.auth.register],
    mutationFn: authRegisterFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        if (res.data.data) {
          setAuthUser(res.data.data);
        }

        optionalCallback();
      }
    },
  });
};

export const useAuthLogin = ({ optionalCallback }: IMutationHookOptions) => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationKey: [listOfQueryKeys.auth.login],
    mutationFn: authLoginFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        if (res.data.data) {
          setAuthUser(res.data.data);
        }

        optionalCallback();
      }
    },
  });
};

export const useAuthRefresh = ({ optionalCallback }: IMutationHookOptions) => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationKey: [listOfQueryKeys.auth.refresh],
    mutationFn: authRefreshFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        if (res.data.data) {
          setAuthUser(res.data.data);
        }

        optionalCallback();
      }
    },
  });
};

export const useAuthLogout = ({ optionalCallback }: IMutationHookOptions) => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationKey: [listOfQueryKeys.auth.logout],
    mutationFn: authLogoutFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        clearAuth();
        optionalCallback();
      }
    },
  });
};

export const useAuthMe = () => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const query = useQuery({
    queryKey: [listOfQueryKeys.auth.me],
    queryFn: authMeFn,
    select: (res) => res.data.data,
  });

  useEffect(() => {
    if (query.data) {
      setAuthUser(query.data);
    }
  }, [query.data, setAuthUser]);

  return query;
};
