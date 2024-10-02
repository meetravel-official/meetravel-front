import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import {
  GetMyPageResponse,
  UpdateMyPageInfoRequest,
  UpdateNicknameRequest,
} from "../interfaces/user";
import { api } from "../request";
import { userApiRoute } from "../routes/apiRoutes";

export const useGetMyPage = () => {
  return useQuery<GetMyPageResponse, AxiosError>({
    queryKey: ["useGetMyPage"],
    queryFn: () => api.get(userApiRoute.getMyPage),
  });
};

export const usePutInfo = () => {
  return useMutation<AxiosResponse, AxiosError, UpdateMyPageInfoRequest>({
    mutationFn: (data) => api.put(userApiRoute.userInfo, data),
    retry: false,
  });
};

export const usePutNickname = () => {
  return useMutation<AxiosResponse, AxiosError, UpdateNicknameRequest>({
    mutationFn: (data) => api.put(userApiRoute.userNickname, data),
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
      api.put(userApiRoute.userProfileImage, profileImageUrl),
  });
};

export const useDeleteUser = () => {
  return useMutation<AxiosResponse, AxiosError>({
    mutationFn: () => {
      return api.delete(userApiRoute.usersDelete);
    },
  });
};

export const useGetOtherProfile = (otherUserId?: string) => {
  return useQuery<GetMyPageResponse, AxiosError>({
    queryKey: ["useGetOtherProfile", otherUserId],
    queryFn: () => api.get(userApiRoute.otherProfile(otherUserId || "")),
    enabled: !!otherUserId,
  });
};
