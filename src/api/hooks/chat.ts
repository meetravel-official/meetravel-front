import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { IMatchingData } from "../interfaces/chat";
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
