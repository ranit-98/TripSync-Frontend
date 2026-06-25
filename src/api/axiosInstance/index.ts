import { BaseApiResponse, IAuthData } from "@/typescript/interface/api";
import {
  globalCatchError,
  globalCatchSuccess,
  globalCatchWarning
} from "@/lib/functions/_helpers.lib";
import { useAuthStore } from "@/store";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { baseUrlApi, endpoints, successNotificationEndPoints } from "../endpoints";

let abortController = new AbortController();
let isHandlingServerError = false;
let refreshPromise: Promise<AxiosResponse<BaseApiResponse<IAuthData>>> | null = null;
const successNotificationEndPointSet = new Set(successNotificationEndPoints);
const authEndpointSet = new Set([
  endpoints.auth.login("v1"),
  endpoints.auth.logout("v1"),
  endpoints.auth.refresh("v1"),
  endpoints.auth.register("v1"),
]);

type AuthRetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

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

  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

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

    const originalConfig = error.config as AuthRetryConfig | undefined;
    const requestUrl = originalConfig?.url ?? "";
    const shouldAttemptRefresh =
      error.response?.status === 401 &&
      !!originalConfig &&
      !originalConfig._retry &&
      !authEndpointSet.has(requestUrl);

    if (shouldAttemptRefresh) {
      originalConfig._retry = true;

      try {
        refreshPromise ??= axios.post<BaseApiResponse<IAuthData>>(
          endpoints.auth.refresh("v1"),
          {},
          {
            baseURL: baseUrlApi,
            headers: {
              "Content-Type": "application/json"
            },
            timeout: 30000,
            withCredentials: true
          }
        );

        const refreshResponse = await refreshPromise;

        if (refreshResponse.data?.data) {
          useAuthStore.getState().setAuthUser(refreshResponse.data.data);
        }

        return axiosInstance(originalConfig);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.replace("/login");
        }

        return Promise.reject(refreshError);
      } finally {
        refreshPromise = null;
      }
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
