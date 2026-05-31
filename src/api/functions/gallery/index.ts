//=======================================================>
// GALLERY API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IAlbum,
  IBodyPayload,
  ICreatePhotoPayload,
  IPhoto,
  IUpdatePhotoPayload,
  IWithPhotoId,
  IWithTripId,
} from "@/typescript/interface/api";



export const galleryAlbumsFn = async (): ApiMutationResponse<IAlbum[]> => {
  const res = await axiosInstance.get(endpoints.gallery.albums("v1"));

  return res;
};

export const galleryAlbumFn = async ({ tripId }: IWithTripId): ApiMutationResponse<IAlbum> => {
  const res = await axiosInstance.get(endpoints.gallery.album("v1", tripId));

  return res;
};

export const galleryPhotosFn = async ({ tripId }: IWithTripId): ApiMutationResponse<IPhoto[]> => {
  const res = await axiosInstance.get(endpoints.gallery.photos("v1", tripId));

  return res;
};

export const galleryCreatePhotoFn = async ({
  body,
  tripId,
}: IBodyPayload<ICreatePhotoPayload> & IWithTripId): ApiMutationResponse<IPhoto> => {
  const res = await axiosInstance.post(endpoints.gallery.createPhoto("v1", tripId), body);

  return res;
};

export const galleryUpdatePhotoFn = async ({
  body,
  photoId,
  tripId,
}: IBodyPayload<IUpdatePhotoPayload> & IWithPhotoId): ApiMutationResponse<IPhoto> => {
  const res = await axiosInstance.patch(endpoints.gallery.updatePhoto("v1", tripId, photoId), body);

  return res;
};

export const galleryDeletePhotoFn = async ({ photoId, tripId }: IWithPhotoId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.gallery.deletePhoto("v1", tripId, photoId));

  return res;
};
