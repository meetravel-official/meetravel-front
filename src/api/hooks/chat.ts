import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { IChatUserData, IMatchingData } from "../interfaces/chat";
import { api } from "../request";
import { chatApiRoute } from "../routes/apiRoutes";

interface IChatRoomsResponse {
  chatRooms: IMatchingData[];
}

export const useGetChatRooms = () => {
  return useQuery<IChatRoomsResponse, AxiosError>({
    queryKey: ["useGetChatRooms"],
    queryFn: () => api.get(chatApiRoute.chatRooms),
  });
};

export const useGetChatUsers = (chatRoomId: string) => {
  return useQuery<IChatUserData, AxiosError>({
    queryKey: ["useGetChatUsers"],
    queryFn: () => api.get(`${chatApiRoute.chatRooms}/${chatRoomId}`),
  });
};

export const usePostJoinChatRoom = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (chatRoomId: number) => {
      return api.post(
        `${chatApiRoute.chatRooms__join}/${chatRoomId}`,
        undefined
      );
    },
  });
};

export const usePostLeaveChatRoom = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (chatRoomId: number) => {
      return api.post(
        `${chatApiRoute.chatRooms__leave}/${chatRoomId}`,
        undefined
      );
    },
  });
};

interface IChatRoomsResponse {
  chatRoomId: number;
  createdAt: string;
}

interface PostChatRoomsParams {
  matchingFormId: number;
}

export const usePostChatRooms = () => {
  return useMutation<IChatRoomsResponse, AxiosError, PostChatRoomsParams>({
    mutationFn: (params: PostChatRoomsParams) => {
      return api.post(chatApiRoute.chatRooms, params);
    },
  });
};
