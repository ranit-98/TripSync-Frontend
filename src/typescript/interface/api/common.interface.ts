import type { AxiosResponse } from "axios";

export interface BaseApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string | string[];
  success?: boolean;
  status?: boolean;
  statusCode?: number;
  pagination?: IPagination;
  notificationCounts?: INotificationCounts;
}

export interface INotificationCounts {
  all: number;
  invite: number;
  expense: number;
  itinerary: number;
  unread: number;
  today: number;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface IPageParams {
  page?: number;
  limit?: number;
}

export type ApiResponse<T = unknown> = AxiosResponse<BaseApiResponse<T>>;
export type ApiMutationResponse<T = unknown> = Promise<ApiResponse<T>>;

export type ApiId = string;
export type TripRole = "collaborator" | "viewer";
export type UploadTarget = "photo" | "document" | "cover" | "chat";

export interface IBodyPayload<TBody> {
  body: TBody;
}

export interface IWithTripId {
  tripId: ApiId;
}

export interface IWithInviteId {
  inviteId: ApiId;
}

export interface IWithMemberId extends IWithTripId {
  memberId: ApiId;
}

export interface IWithDayId extends IWithTripId {
  dayId: ApiId;
}

export interface IWithActivityId extends IWithTripId {
  activityId: ApiId;
}

export interface IWithExpenseId extends IWithTripId {
  expenseId: ApiId;
}

export interface IWithSettlementId extends IWithTripId {
  settlementId: ApiId;
}

export interface IWithLocationId extends IWithTripId {
  locationId: ApiId;
}

export interface IWithMessageId extends IWithTripId {
  messageId: ApiId;
}

export interface IWithPhotoId extends IWithTripId {
  photoId: ApiId;
}

export interface IWithFolderId extends IWithTripId {
  folderId: ApiId;
}

export interface IWithDocumentId extends IWithTripId {
  documentId: ApiId;
}

export interface IWithNotificationId {
  notificationId: ApiId;
}
