import type { ApiId } from "./common.interface";
import type { ITrip } from "./trips.interface";

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

export interface IAlbum extends ITrip {
  photoCount?: number;
}
