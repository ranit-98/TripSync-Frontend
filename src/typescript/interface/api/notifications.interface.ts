import type { ApiId } from "./common.interface";

export interface INotification {
  id: ApiId;
  actionUrl?: string;
  action_url?: string;
  body?: string;
  data?: Record<string, unknown>;
  inviteId?: ApiId;
  metadata?: Record<string, unknown>;
  title?: string;
  message?: string;
  read_at?: string;
  readAt?: string;
  resource_id?: ApiId;
  resource_type?: string;
  resourceId?: ApiId;
  resourceType?: string;
  trip_id?: ApiId;
  tripId?: ApiId;
  createdAt?: string;
  type?: string;
}
