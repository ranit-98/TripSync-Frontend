import type { ApiId } from "./common.interface";

export interface ICreatePhotoPayload {
  objectKey: string;
  url: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  caption?: string;
}

export type IUpdatePhotoPayload = Partial<ICreatePhotoPayload>;

export interface IPhoto extends ICreatePhotoPayload {
  id: ApiId;
}

export interface IAlbum {
  tripId: ApiId;
  title?: string;
  coverUrl?: string;
  photoCount?: number;
  photos?: IPhoto[];
}
