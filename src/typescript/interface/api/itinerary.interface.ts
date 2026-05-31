import type { ApiId } from "./common.interface";

export interface ICreateDayPayload {
  date: string;
  title?: string;
}

export interface IUpdateDayPayload {
  title?: string;
}

export interface IItineraryDay {
  id: ApiId;
  date: string;
  title?: string;
  activities?: IActivity[];
}

export interface ICreateActivityPayload {
  dayId?: ApiId;
  title: string;
  description?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
}

export type IUpdateActivityPayload = Partial<ICreateActivityPayload>;

export interface IReorderActivityItem {
  activityId: ApiId;
  position: number;
  dayId?: ApiId;
}

export interface IReorderActivitiesPayload {
  items: IReorderActivityItem[];
}

export interface IActivity {
  id: ApiId;
  dayId?: ApiId;
  title: string;
  description?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  position?: number;
}
