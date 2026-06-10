"use client";

import {
  tripsAcceptInviteFn,
  tripsArchiveFn,
  tripsCreateFn,
  tripsDeclineInviteFn,
  tripsDetailsFn,
  tripsInviteFn,
  tripsListFn,
  tripsMembersFn,
  tripsPendingInvitesFn,
  tripsRemoveMemberFn,
  tripsUpdateFn,
  tripsUpdateMemberFn,
  tripsUploadCoverFn,
} from "@/api/functions/trips";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTripsList = () => {
  return useQuery({
    queryKey: [listOfQueryKeys.trips.list],
    queryFn: tripsListFn,
  });
};

export const useTripDetails = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.trips.details, tripId],
    queryFn: () => tripsDetailsFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useTripMembers = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.trips.members, tripId],
    queryFn: () => tripsMembersFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useTripsPendingInvites = () => {
  return useQuery({
    queryKey: [listOfQueryKeys.trips.pendingInvites],
    queryFn: tripsPendingInvitesFn,
  });
};

export const useTripsCreate = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.trips.create],
    mutationFn: tripsCreateFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.list] });
        optionalCallback();
      }
    },
  });
};

export const useTripsUpdate = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.trips.update],
    mutationFn: tripsUpdateFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.list] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.details, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useTripsArchive = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.trips.archive],
    mutationFn: tripsArchiveFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useTripsUploadCover = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.trips.cover],
    mutationFn: tripsUploadCoverFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.list] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.details, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useTripsInvite = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.trips.invite],
    mutationFn: tripsInviteFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.members, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useTripsUpdateMember = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.trips.members, "update"],
    mutationFn: tripsUpdateMemberFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useTripsRemoveMember = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.trips.members, "remove"],
    mutationFn: tripsRemoveMemberFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useTripsAcceptInvite = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.trips.invites, "accept"],
    mutationFn: tripsAcceptInviteFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.list] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.pendingInvites] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.notifications.list] });
        optionalCallback();
      }
    },
  });
};

export const useTripsDeclineInvite = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.trips.invites, "decline"],
    mutationFn: tripsDeclineInviteFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.notifications.list] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.trips.pendingInvites] });
        optionalCallback();
      }
    },
  });
};
