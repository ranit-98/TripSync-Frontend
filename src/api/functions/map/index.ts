//=======================================================>
// MAP API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IBodyPayload,
  ICreateLocationPayload,
  ILocation,
  IUpdateLocationPayload,
  IWithLocationId,
  IWithTripId,
} from "@/typescript/interface/api";

export const mapLocationsFn = async ({ tripId }: IWithTripId): ApiMutationResponse<ILocation[]> => {
  const res = await axiosInstance.get(endpoints.map.locations("v1", tripId));

  return res;
};

export const mapCreateLocationFn = async ({
  body,
  tripId,
}: IBodyPayload<ICreateLocationPayload> & IWithTripId): ApiMutationResponse<ILocation> => {
  const res = await axiosInstance.post(endpoints.map.createLocation("v1", tripId), body);

  return res;
};

export const mapUpdateLocationFn = async ({
  body,
  locationId,
  tripId,
}: IBodyPayload<IUpdateLocationPayload> & IWithLocationId): ApiMutationResponse<ILocation> => {
  const res = await axiosInstance.patch(endpoints.map.updateLocation("v1", tripId, locationId), body);

  return res;
};

export const mapDeleteLocationFn = async ({ locationId, tripId }: IWithLocationId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.map.deleteLocation("v1", tripId, locationId));

  return res;
};

export const mapOptimizeRouteFn = async ({ tripId }: IWithTripId): ApiMutationResponse<ILocation[]> => {
  const res = await axiosInstance.post(endpoints.map.optimizeRoute("v1", tripId));

  return res;
};
