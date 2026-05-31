"use client";

import {
  mapCreateLocationFn,
  mapDeleteLocationFn,
  mapLocationsFn,
  mapOptimizeRouteFn,
  mapUpdateLocationFn,
} from "@/api/functions/map";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useMapLocations = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.map.locations, tripId],
    queryFn: () => mapLocationsFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useMapCreateLocation = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.map.locations, "create"],
    mutationFn: mapCreateLocationFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useMapUpdateLocation = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.map.locations, "update"],
    mutationFn: mapUpdateLocationFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useMapDeleteLocation = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.map.locations, "delete"],
    mutationFn: mapDeleteLocationFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useMapOptimizeRoute = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.map.optimizeRoute],
    mutationFn: mapOptimizeRouteFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
