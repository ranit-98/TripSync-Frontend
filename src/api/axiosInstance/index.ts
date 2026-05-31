import { BaseApiResponse } from "@/typescript/interface/api";
import {
  globalCatchError,
  globalCatchSuccess,
  globalCatchWarning
} from "@/lib/functions/_helpers.lib";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { baseUrlApi, successNotificationEndPoints } from "../endpoints";

let abortController = new AbortController();
let isHandlingServerError = false;
const successNotificationEndPointSet = new Set(successNotificationEndPoints);

const axiosInstance = axios.create({
  baseURL: baseUrlApi,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.signal = abortController.signal;

  return config;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<BaseApiResponse>) => {
    const requestUrl = res.config.url ?? "";

    if (res.data) {
      res.data.statusCode = res.data.statusCode ?? res.status;
      res.data.status = res.data.status ?? res.data.success;
    }

    if (successNotificationEndPointSet.has(requestUrl)) {
      const isSuccessStatus = res.status >= 200 && res.status < 300;
      const isSuccessBody =
        res.data?.success === false
          ? false
          : res.data?.statusCode
            ? res.data.statusCode >= 200 && res.data.statusCode < 300
            : true;

      if (!isSuccessStatus || !isSuccessBody) {
        globalCatchWarning(res);
      } else {
        globalCatchSuccess(res);
      }
    }

    return res;
  },
  async (error: AxiosError<BaseApiResponse>) => {
    if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    if (isHandlingServerError) {
      return Promise.reject(error);
    }

    if (error?.response?.status && error.response.status >= 500) {
      isHandlingServerError = true;

      abortController.abort();
      abortController = new AbortController();

      globalCatchError(error);

      setTimeout(() => {
        isHandlingServerError = false;
      }, 1000);
    } else {
      globalCatchError(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
