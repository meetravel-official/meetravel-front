import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import {
  GetMyPageResponse,
  UpdateMyPageInfoRequest,
  UpdateNicknameRequest,
} from "../interfaces/user";
import { api } from "../request";
import { authApiRoute } from "../routes/apiRoutes";

export const useGetMyPage = () => {
  return useQuery<GetMyPageResponse, AxiosError>({
    queryKey: ["useGetMyPage"],
    queryFn: () => api.get(authApiRoute.getMyPage),
  });
};

export const usePutInfo = () => {
  return useMutation<AxiosResponse, AxiosError, UpdateMyPageInfoRequest>({
    mutationFn: (data) => api.put(authApiRoute.userInfo, data),
    retry: false,
  });
};

export const usePutNickname = () => {
  return useMutation<AxiosResponse, AxiosError, UpdateNicknameRequest>({
    mutationFn: (data) => api.put(authApiRoute.userNickname, data),
    retry: false,
  });
};

export const usePutUserProfileImage = () => {
  return useMutation<
    AxiosResponse,
    AxiosError,
    { profileImageUrl?: string | null }
  >({
    mutationFn: (profileImageUrl) =>
      api.put(authApiRoute.userProfileImage, profileImageUrl),
  });
};
