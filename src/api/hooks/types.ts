import { HttpStatusCode } from "axios";

export interface IMutationHookOptions {
  optionalCallback: () => void;
}

export const isSuccessResponse = (statusCode?: number) => {
  return statusCode === HttpStatusCode.Ok || statusCode === HttpStatusCode.Created;
};
