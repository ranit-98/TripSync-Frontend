//=======================================================>
// TRIPS API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IBodyPayload,
  ICreateTripPayload,
  IInviteMemberPayload,
  ITrip,
  ITripMember,
  IUpdateMemberPayload,
  IUpdateTripPayload,
  IUploadCoverPayload,
  IWithInviteId,
  IWithMemberId,
  IWithTripId,
} from "@/typescript/interface/api";

export const tripsListFn = async (): ApiMutationResponse<ITrip[]> => {
  const res = await axiosInstance.get(endpoints.trips.list("v1"));

  return res;
};

export const tripsCreateFn = async (body: ICreateTripPayload): ApiMutationResponse<ITrip> => {
  const res = await axiosInstance.post(endpoints.trips.create("v1"), body);

  return res;
};

export const tripsDetailsFn = async ({ tripId }: IWithTripId): ApiMutationResponse<ITrip> => {
  const res = await axiosInstance.get(endpoints.trips.details("v1", tripId));

  return res;
};

export const tripsUpdateFn = async ({
  body,
  tripId,
}: IBodyPayload<IUpdateTripPayload> & IWithTripId): ApiMutationResponse<ITrip> => {
  const res = await axiosInstance.patch(endpoints.trips.update("v1", tripId), body);

  return res;
};

export const tripsArchiveFn = async ({ tripId }: IWithTripId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.trips.archive("v1", tripId));

  return res;
};

export const tripsUploadCoverFn = async ({
  body,
  tripId,
}: IBodyPayload<IUploadCoverPayload> & IWithTripId): ApiMutationResponse<ITrip> => {
  const res = await axiosInstance.post(endpoints.trips.uploadCover("v1", tripId), body);

  return res;
};

export const tripsMembersFn = async ({ tripId }: IWithTripId): ApiMutationResponse<ITripMember[]> => {
  const res = await axiosInstance.get(endpoints.trips.members("v1", tripId));

  return res;
};

export const tripsInviteFn = async ({
  body,
  tripId,
}: IBodyPayload<IInviteMemberPayload> & IWithTripId): ApiMutationResponse => {
  const res = await axiosInstance.post(endpoints.trips.invite("v1", tripId), body);

  return res;
};

export const tripsUpdateMemberFn = async ({
  body,
  memberId,
  tripId,
}: IBodyPayload<IUpdateMemberPayload> & IWithMemberId): ApiMutationResponse<ITripMember> => {
  const res = await axiosInstance.patch(endpoints.trips.updateMember("v1", tripId, memberId), body);

  return res;
};

export const tripsRemoveMemberFn = async ({ memberId, tripId }: IWithMemberId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.trips.removeMember("v1", tripId, memberId));

  return res;
};

export const tripsAcceptInviteFn = async ({ inviteId }: IWithInviteId): ApiMutationResponse => {
  const res = await axiosInstance.post(endpoints.trips.acceptInvite("v1", inviteId));

  return res;
};

export const tripsDeclineInviteFn = async ({ inviteId }: IWithInviteId): ApiMutationResponse => {
  const res = await axiosInstance.post(endpoints.trips.declineInvite("v1", inviteId));

  return res;
};
