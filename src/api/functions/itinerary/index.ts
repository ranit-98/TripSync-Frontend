//=======================================================>
// ITINERARY API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IActivity,
  IBodyPayload,
  ICreateActivityPayload,
  ICreateDayPayload,
  IItineraryDay,
  IReorderActivitiesPayload,
  IUpdateActivityPayload,
  IUpdateDayPayload,
  IWithActivityId,
  IWithDayId,
  IWithTripId,
} from "@/typescript/interface/api";

export const itineraryGetFn = async ({ tripId }: IWithTripId): ApiMutationResponse<IItineraryDay[]> => {
  const res = await axiosInstance.get(endpoints.itinerary.get("v1", tripId));

  return res;
};

export const itineraryCreateDayFn = async ({
  body,
  tripId,
}: IBodyPayload<ICreateDayPayload> & IWithTripId): ApiMutationResponse<IItineraryDay> => {
  const res = await axiosInstance.post(endpoints.itinerary.createDay("v1", tripId), body);

  return res;
};

export const itineraryUpdateDayFn = async ({
  body,
  dayId,
  tripId,
}: IBodyPayload<IUpdateDayPayload> & IWithDayId): ApiMutationResponse<IItineraryDay> => {
  const res = await axiosInstance.patch(endpoints.itinerary.updateDay("v1", tripId, dayId), body);

  return res;
};

export const itineraryDeleteDayFn = async ({ dayId, tripId }: IWithDayId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.itinerary.deleteDay("v1", tripId, dayId));

  return res;
};

export const itineraryCreateActivityFn = async ({
  body,
  tripId,
}: IBodyPayload<ICreateActivityPayload> & IWithTripId): ApiMutationResponse<IActivity> => {
  const res = await axiosInstance.post(endpoints.itinerary.createActivity("v1", tripId), body);

  return res;
};

export const itineraryReorderActivitiesFn = async ({
  body,
  tripId,
}: IBodyPayload<IReorderActivitiesPayload> & IWithTripId): ApiMutationResponse<IActivity[]> => {
  const res = await axiosInstance.patch(endpoints.itinerary.reorderActivities("v1", tripId), body);

  return res;
};

export const itineraryUpdateActivityFn = async ({
  activityId,
  body,
  tripId,
}: IBodyPayload<IUpdateActivityPayload> & IWithActivityId): ApiMutationResponse<IActivity> => {
  const res = await axiosInstance.patch(endpoints.itinerary.updateActivity("v1", tripId, activityId), body);

  return res;
};

export const itineraryDeleteActivityFn = async ({
  activityId,
  tripId,
}: IWithActivityId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.itinerary.deleteActivity("v1", tripId, activityId));

  return res;
};
