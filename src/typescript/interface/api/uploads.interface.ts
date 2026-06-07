import type { UploadTarget } from "./common.interface";

export interface ISignUploadPayload {
  fileName: string;
  mimeType: string;
  target: UploadTarget;
}

export interface ISignedUpload {
  apiKey?: string;
  cloudName?: string;
  objectKey?: string;
  folder?: string;
  publicId?: string;
  signature?: string;
  timestamp?: number;
  uploadUrl?: string;
}

export interface ICloudinaryUploadResponse {
  secure_url?: string;
  url?: string;
}
