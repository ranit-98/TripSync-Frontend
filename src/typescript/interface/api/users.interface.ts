import type { ApiId } from "./common.interface";

export interface IUser {
  id: ApiId;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUpdateUserPayload {
  name?: string;
  avatarUrl?: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ITravelStats {
  destinationsSaved: number;
  tripsPlanned: number;
  upcomingTrips: number;
}
