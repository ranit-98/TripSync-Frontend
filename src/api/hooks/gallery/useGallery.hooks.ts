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
import { useWindowInfiniteScroll } from "@/hooks/useWindowInfiniteScroll";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGalleryAlbums = () => {
  const query = useInfiniteQuery({
    queryKey: [listOfQueryKeys.gallery.albums],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => galleryAlbumsFn({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.data.pagination?.hasNextPage ? lastPage.data.pagination.page + 1 : undefined,
  });
  useWindowInfiniteScroll(query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage);
  return query;
};

export const useGalleryAlbum = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.gallery.album, tripId],
    queryFn: () => galleryAlbumFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useGalleryPhotos = (tripId?: string) => {
  const query = useInfiniteQuery({
    queryKey: [listOfQueryKeys.gallery.photos, tripId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => galleryPhotosFn({ tripId: tripId ?? "", page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.data.pagination?.hasNextPage ? lastPage.data.pagination.page + 1 : undefined,
    enabled: Boolean(tripId),
  });
  useWindowInfiniteScroll(query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage);
  return query;
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
