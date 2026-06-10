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
  ITripInvite,
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
  if (body.cover) {
    const formData = new FormData();
    formData.append("title", body.title);
    formData.append("destination", body.destination);
    formData.append("startDate", body.startDate);
    formData.append("endDate", body.endDate);
    formData.append("cover", body.cover);

    if (body.currency) formData.append("currency", body.currency);
    if (body.budget !== undefined) formData.append("budget", String(body.budget));
    if (body.coverUrl) formData.append("coverUrl", body.coverUrl);
    if (body.inviteEmail) formData.append("inviteEmail", body.inviteEmail);
    if (body.inviteRole) formData.append("inviteRole", body.inviteRole);
    if (body.inviteNotes) formData.append("inviteNotes", body.inviteNotes);
    body.styles?.forEach((style) => formData.append("styles", style));

    const res = await axiosInstance.post(endpoints.trips.create("v1"), formData);

    return res;
  }

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
  if (body.cover) {
    const formData = new FormData();
    formData.append("cover", body.cover);

    const res = await axiosInstance.post(endpoints.trips.uploadCover("v1", tripId), formData);

    return res;
  }

  const res = await axiosInstance.post(endpoints.trips.uploadCover("v1", tripId), {
    coverUrl: body.coverUrl,
  });

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

export const tripsPendingInvitesFn = async (): ApiMutationResponse<ITripInvite[]> => {
  const res = await axiosInstance.get(endpoints.trips.pendingInvites("v1"));

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
