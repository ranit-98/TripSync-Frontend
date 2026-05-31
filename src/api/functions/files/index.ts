//=======================================================>
// FILES API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IBodyPayload,
  ICreateDocumentPayload,
  ICreateFolderPayload,
  IDocument,
  IFolder,
  IUpdateDocumentPayload,
  IUpdateFolderPayload,
  IWithDocumentId,
  IWithFolderId,
  IWithTripId,
} from "@/typescript/interface/api";

export const filesFoldersFn = async ({ tripId }: IWithTripId): ApiMutationResponse<IFolder[]> => {
  const res = await axiosInstance.get(endpoints.files.folders("v1", tripId));

  return res;
};

export const filesCreateFolderFn = async ({
  body,
  tripId,
}: IBodyPayload<ICreateFolderPayload> & IWithTripId): ApiMutationResponse<IFolder> => {
  const res = await axiosInstance.post(endpoints.files.createFolder("v1", tripId), body);

  return res;
};

export const filesUpdateFolderFn = async ({
  body,
  folderId,
  tripId,
}: IBodyPayload<IUpdateFolderPayload> & IWithFolderId): ApiMutationResponse<IFolder> => {
  const res = await axiosInstance.patch(endpoints.files.updateFolder("v1", tripId, folderId), body);

  return res;
};

export const filesDeleteFolderFn = async ({ folderId, tripId }: IWithFolderId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.files.deleteFolder("v1", tripId, folderId));

  return res;
};

export const filesDocumentsFn = async ({ folderId, tripId }: IWithFolderId): ApiMutationResponse<IDocument[]> => {
  const res = await axiosInstance.get(endpoints.files.documents("v1", tripId, folderId));

  return res;
};

export const filesCreateDocumentFn = async ({
  body,
  folderId,
  tripId,
}: IBodyPayload<ICreateDocumentPayload> & IWithFolderId): ApiMutationResponse<IDocument> => {
  const res = await axiosInstance.post(endpoints.files.createDocument("v1", tripId, folderId), body);

  return res;
};

export const filesDownloadDocumentFn = async ({ documentId, tripId }: IWithDocumentId): ApiMutationResponse<string> => {
  const res = await axiosInstance.get(endpoints.files.downloadDocument("v1", tripId, documentId));

  return res;
};

export const filesUpdateDocumentFn = async ({
  body,
  documentId,
  tripId,
}: IBodyPayload<IUpdateDocumentPayload> & IWithDocumentId): ApiMutationResponse<IDocument> => {
  const res = await axiosInstance.patch(endpoints.files.updateDocument("v1", tripId, documentId), body);

  return res;
};

export const filesDeleteDocumentFn = async ({ documentId, tripId }: IWithDocumentId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.files.deleteDocument("v1", tripId, documentId));

  return res;
};
