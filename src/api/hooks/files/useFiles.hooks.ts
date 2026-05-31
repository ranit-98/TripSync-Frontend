"use client";

import {
  filesCreateDocumentFn,
  filesCreateFolderFn,
  filesDeleteDocumentFn,
  filesDeleteFolderFn,
  filesDocumentsFn,
  filesDownloadDocumentFn,
  filesFoldersFn,
  filesUpdateDocumentFn,
  filesUpdateFolderFn,
} from "@/api/functions/files";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFilesFolders = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.files.folders, tripId],
    queryFn: () => filesFoldersFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useFilesDocuments = (tripId?: string, folderId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.files.documents, tripId, folderId],
    queryFn: () => filesDocumentsFn({ tripId: tripId ?? "", folderId: folderId ?? "" }),
    enabled: Boolean(tripId && folderId),
  });
};

export const useFilesDownloadDocument = (tripId?: string, documentId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.files.download, tripId, documentId],
    queryFn: () => filesDownloadDocumentFn({ tripId: tripId ?? "", documentId: documentId ?? "" }),
    enabled: Boolean(tripId && documentId),
  });
};

export const useFilesCreateFolder = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.files.folders, "create"],
    mutationFn: filesCreateFolderFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useFilesUpdateFolder = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.files.folders, "update"],
    mutationFn: filesUpdateFolderFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useFilesDeleteFolder = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.files.folders, "delete"],
    mutationFn: filesDeleteFolderFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useFilesCreateDocument = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.files.documents, "create"],
    mutationFn: filesCreateDocumentFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useFilesUpdateDocument = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.files.documents, "update"],
    mutationFn: filesUpdateDocumentFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useFilesDeleteDocument = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.files.documents, "delete"],
    mutationFn: filesDeleteDocumentFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
