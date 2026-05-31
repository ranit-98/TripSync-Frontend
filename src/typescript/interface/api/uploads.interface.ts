import type { UploadTarget } from "./common.interface";

export interface ISignUploadPayload {
  fileName: string;
  mimeType: string;
  target: UploadTarget;
}

export interface ISignedUpload {
  url?: string;
  objectKey?: string;
  fields?: Record<string, string>;
}
