import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import {
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
} from "utils/token-utils";

import { HOST_API_URL } from "./hosts/index";

interface CustomAxiosInstance extends AxiosInstance {
  getUri(config?: AxiosRequestConfig): string;

  request<T>(config: AxiosRequestConfig): Promise<T>;

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

const headers = {
  json: { "content-type": "application/json" },
  multipart: { "content-type": "multipart/form-data" },
} as const;

const request: CustomAxiosInstance = axios.create({
  withCredentials: true,
  timeout: 1000000,
  headers: headers.json,
});

request.interceptors.request.use((req) => {
  if (req.url?.includes("login")) {
    return req;
  }
  const token = Cookies.get("accessToken") || "";
  if (req && req.headers && req.url?.includes(HOST_API_URL)) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

request.interceptors.response.use(
  (res) => {
    if (res.request.responseURL.includes(process.env.REACT_APP_HOST_API_URL)) {
      if (res.headers["authorization"]) {
        setAccessTokenToCookie(
          res.headers["authorization"].replaceAll("Bearer ", "")
        );
      }
      if (res.headers["authorization-refresh"]) {
        setRefreshTokenToCookie(
          res.headers["authorization-refresh"].replaceAll("Bearer ", "")
        );
      }
      return res.data;
    }
    return res;
  },

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status == 401) {
      // console.log('401 에러');
    }
    return Promise.reject(error);
  }
);

export default request;

export const api = {
  get: <T>(url: string, params?: object) => request.get<T>(url, { ...params }),
  post: <T>(url: string, data: unknown, config?: AxiosRequestConfig) =>
    request.post<T>(url, data, config),
  patch: <T>(url: string, data: unknown) => request.patch<T>(url, data),
  put: <T>(url: string, data: unknown) => request.put<T>(url, data),
  delete: <T>(url: string) => request.delete<T>(url),
  postDownload: <T>(url: string, data: unknown) =>
    request.post<T>(url, data, {
      responseType: "blob",
    }),
  postFile: <T>(url: string, data: unknown) =>
    request.post<T>(url, data, {
      headers: headers.multipart,
    }),
  putFile: <T>(url: string, data: unknown) =>
    request.put<T>(url, data, {
      headers: headers.multipart,
    }),
  patchFile: <T>(url: string, data: unknown) =>
    request.patch<T>(url, data, {
      headers: headers.multipart,
    }),
};
