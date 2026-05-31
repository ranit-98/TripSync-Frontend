import type { BaseApiResponse } from "@/typescript/interface/api";
import type { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const getMessage = (value: unknown, fallback: string) => {
  if (!value) {
    return fallback;
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ") || fallback;
  }

  return String(value);
};

export const globalCatchSuccess = (res: AxiosResponse<BaseApiResponse>) => {
  toast.success(getMessage(res.data?.message, "Request completed successfully"));
};

export const globalCatchWarning = (res: AxiosResponse<BaseApiResponse>) => {
  toast.error(getMessage(res.data?.message, "Something went wrong"));
};

export const globalCatchError = (error: AxiosError<BaseApiResponse>) => {
  if (error.code === "ERR_CANCELED") {
    return;
  }

  toast.error(getMessage(error.response?.data?.message ?? error.message, "Something went wrong"));
};
