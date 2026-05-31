import type { ApiId } from "./common.interface";

export interface ICreateFolderPayload {
  name: string;
  description?: string;
}

export type IUpdateFolderPayload = Partial<ICreateFolderPayload>;

export interface IFolder {
  id: ApiId;
  name: string;
  description?: string;
}

export interface ICreateDocumentPayload {
  objectKey: string;
  url: string;
  displayName: string;
  originalFileName: string;
  mimeType: string;
  size: number;
}

export interface IUpdateDocumentPayload {
  displayName: string;
}

export interface IDocument extends ICreateDocumentPayload {
  id: ApiId;
}
