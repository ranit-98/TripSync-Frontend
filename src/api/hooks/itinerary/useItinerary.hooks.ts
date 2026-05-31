"use client";

import {
  itineraryCreateActivityFn,
  itineraryCreateDayFn,
  itineraryDeleteActivityFn,
  itineraryDeleteDayFn,
  itineraryGetFn,
  itineraryReorderActivitiesFn,
  itineraryUpdateActivityFn,
  itineraryUpdateDayFn,
} from "@/api/functions/itinerary";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useItinerary = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.itinerary.details, tripId],
    queryFn: () => itineraryGetFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useItineraryCreateDay = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.itinerary.days, "create"],
    mutationFn: itineraryCreateDayFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useItineraryUpdateDay = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.itinerary.days, "update"],
    mutationFn: itineraryUpdateDayFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useItineraryDeleteDay = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.itinerary.days, "delete"],
    mutationFn: itineraryDeleteDayFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useItineraryCreateActivity = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.itinerary.activities, "create"],
    mutationFn: itineraryCreateActivityFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useItineraryReorderActivities = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.itinerary.reorder],
    mutationFn: itineraryReorderActivitiesFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useItineraryUpdateActivity = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.itinerary.activities, "update"],
    mutationFn: itineraryUpdateActivityFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useItineraryDeleteActivity = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.itinerary.activities, "delete"],
    mutationFn: itineraryDeleteActivityFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
