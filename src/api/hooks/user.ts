import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import {
  GetMyPageResponse,
  UpdateMyPageInfoRequest,
  UpdateNicknameRequest,
} from "../interfaces/user";
import { api } from "../request";
import { authApiRoute } from "../routes/apiRoutes";

export const useGetMyPage = (userId?: string) => {
  return useQuery<GetMyPageResponse, AxiosError>({
    queryKey: ["useGetMyPage", userId],
    queryFn: () => api.get(authApiRoute.getMyPage(userId || "")),
    enabled: !!userId,
  });
};

export const usePutInfo = (userId?: string) => {
  return useMutation<AxiosResponse, AxiosError, UpdateMyPageInfoRequest>({
    mutationFn: (data) => api.put(authApiRoute.userInfo(userId || ""), data),
    retry: false,
  });
};

export const usePutNickname = (userId?: string) => {
  return useMutation<AxiosResponse, AxiosError, UpdateNicknameRequest>({
    mutationFn: (data) =>
      api.put(authApiRoute.userNickname(userId || ""), data),
    retry: false,
  });
};
