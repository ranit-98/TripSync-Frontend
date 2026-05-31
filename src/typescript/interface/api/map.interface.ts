export interface ICreateLocationPayload {
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export type IUpdateLocationPayload = Partial<ICreateLocationPayload>;

export interface ILocation {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}
