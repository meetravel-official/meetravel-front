import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import {
  IChatMessageData,
  IChatRoomListResponse,
  IChatUserData,
  ISearchChat,
  ISearchChatRoomListResponse,
} from "../interfaces/chat";
import { api } from "../request";
import { chatApiRoute } from "../routes/apiRoutes";

export const useGetChatRooms = () => {
  return useQuery<IChatRoomListResponse, AxiosError>({
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

interface PostJoinChatRoomParams {
  chatRoomId: number;
}

export const usePostJoinChatRoom = () => {
  return useMutation<AxiosResponse, AxiosError, PostJoinChatRoomParams>({
    mutationFn: ({ chatRoomId }: PostJoinChatRoomParams) => {
      return api.post(`${chatApiRoute.chatRooms__join}/${chatRoomId}`, {});
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

export interface IGetChatRoomMessagesParams {
  chatRoomId: number;
  lastChatMessageId?: number;
  page?: number;
  pageSize?: number;
}

export interface IGetChatRoomMessagesResponse {
  totalElements: number;
  totalPages: number;
  content: IChatMessageData[];
  number: number;
}

export const useGetChatRoomMessages = (params: IGetChatRoomMessagesParams) => {
  return useInfiniteQuery<IGetChatRoomMessagesResponse, AxiosError>({
    queryKey: ["useGetChatRoomMessages"],
    queryFn: ({ pageParam }) =>
      api.get(`${chatApiRoute.chatRooms}/${params.chatRoomId}/messages`, {
        params: {
          chatRoomId: params.chatRoomId,
          lastChatMessageId: params.lastChatMessageId,
          page: pageParam,
          pageSize: params.pageSize,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastData) => {
      if (lastData.number < lastData.totalPages) return lastData.number + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.number > 1) return firstPage.number - 1;
    },
    select: (data) => ({
      pages: data.pages
        .map((page, index) => {
          const reversedContent = [...page.content].reverse();
          return {
            ...page,
            content: reversedContent,
          };
        })
        .reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
  });
};

export const useGetLiveChatRoom = () => {
  return useQuery<IChatRoomListResponse, AxiosError>({
    queryKey: ["useGetLiveChatRoom"],
    queryFn: () => api.get(chatApiRoute.chatRoomsSearchLive),
  });
};

export const useGetSearchChatRoom = (params: ISearchChat) => {
  return useInfiniteQuery<ISearchChatRoomListResponse, AxiosError>({
    queryKey: ["useGetSearchChatRoom", Object.values(params)],
    queryFn: ({ pageParam }) =>
      api.get(chatApiRoute.chatRoomsSearch, {
        params: { ...params, page: pageParam },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastData) => {
      if (lastData.chatRooms.number < lastData.chatRooms.totalPages - 1)
        return lastData.chatRooms.number + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.chatRooms.number > 1) return firstPage.chatRooms.number - 1;
    },
  });
};
