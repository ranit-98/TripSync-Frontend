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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.gallery.photos, "create"],
    mutationFn: galleryCreatePhotoFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.gallery.photos, variables.tripId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.gallery.album, variables.tripId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.gallery.albums] });
        optionalCallback();
      }
    },
  });
};

export const useGalleryUpdatePhoto = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.gallery.photos, "update"],
    mutationFn: galleryUpdatePhotoFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.gallery.photos, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useGalleryDeletePhoto = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.gallery.photos, "delete"],
    mutationFn: galleryDeletePhotoFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.gallery.photos, variables.tripId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.gallery.album, variables.tripId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.gallery.albums] });
        optionalCallback();
      }
    },
  });
};
