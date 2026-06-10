import type { ApiId, TripRole } from "./common.interface";
import type { IUser } from "./users.interface";

export interface ITrip {
  id: ApiId;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  currency?: string;
  budget?: number;
  coverUrl?: string;
  styles?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ITripInvite {
  id: ApiId;
  tripId: ApiId;
  email: string;
  role: TripRole;
  status: "pending" | "accepted" | "declined" | "expired";
  invitedBy?: ApiId;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  trip?: ITrip;
}

export interface ICreateTripPayload {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  cover?: File;
  currency?: string;
  budget?: number;
  coverUrl?: string;
  styles?: string[];
  inviteEmail?: string;
  inviteRole?: TripRole;
  inviteNotes?: string;
}

export type IUpdateTripPayload = Partial<
  Pick<ITrip, "title" | "destination" | "startDate" | "endDate" | "currency" | "budget" | "coverUrl" | "styles">
>;

export interface IUploadCoverPayload {
  cover?: File;
  coverUrl?: string;
}

export interface IInviteMemberPayload {
  email: string;
  role: TripRole;
  notes?: string;
}

export interface IUpdateMemberPayload {
  role: TripRole;
}

export interface ITripMember {
  id: ApiId;
  role: TripRole;
  user?: IUser;
}
