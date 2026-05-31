"use client";

import {
  galleryAlbumFn,
  galleryAlbumsFn,
  galleryCreatePhotoFn,
  galleryDeletePhotoFn,
  galleryPhotosFn,
  galleryUpdatePhotoFn,
} from "@/api/functions/gallery";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGalleryAlbums = () => {
  return useQuery({
    queryKey: [listOfQueryKeys.gallery.albums],
    queryFn: galleryAlbumsFn,
  });
};

export const useGalleryAlbum = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.gallery.album, tripId],
    queryFn: () => galleryAlbumFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useGalleryPhotos = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.gallery.photos, tripId],
    queryFn: () => galleryPhotosFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useGalleryCreatePhoto = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.gallery.photos, "create"],
    mutationFn: galleryCreatePhotoFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useGalleryUpdatePhoto = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.gallery.photos, "update"],
    mutationFn: galleryUpdatePhotoFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useGalleryDeletePhoto = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.gallery.photos, "delete"],
    mutationFn: galleryDeletePhotoFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
