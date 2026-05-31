import type { ApiId } from "./common.interface";

export interface INotification {
  id: ApiId;
  title?: string;
  message?: string;
  readAt?: string;
  createdAt?: string;
}
