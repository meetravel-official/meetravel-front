import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ITravelPlan } from "../interfaces/travelPlan";
import { api } from "../request";
import { travelApiRoute } from "../routes/apiRoutes";

export const useGetTravelPlan = (chatRoomId?: number) => {
  return useQuery<ITravelPlan, AxiosError>({
    queryKey: ["useGetTravelPlan", chatRoomId],
    queryFn: () => api.get(travelApiRoute.travelPlan(chatRoomId || -1)),
    enabled: !!chatRoomId,
  });
};
