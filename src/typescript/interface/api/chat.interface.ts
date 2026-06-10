import type { ApiId } from "./common.interface";
import type { IUser } from "./users.interface";

export interface ICreateMessagePayload {
  body: string;
}

export interface ICreateAttachmentPayload {
  objectKey: string;
  url: string;
  originalFileName: string;
  mimeType: string;
  size: number;
}

export interface IMessage {
  id: ApiId;
  body: string;
  attachments?: IAttachment[];
  createdAt?: string;
  sender?: IUser | null;
  senderId: ApiId;
  user?: IUser | null;
}

export interface IAttachment extends ICreateAttachmentPayload {
  id: ApiId;
}
