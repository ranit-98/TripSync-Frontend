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

export interface ICreateTripPayload {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
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
  coverUrl: string;
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
