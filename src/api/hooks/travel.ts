import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TravelPlan } from "../interfaces/travel";
import { api } from "../request";
import { travelApiRoute } from "../routes/apiRoutes";

export const useGetTravelPlan = (chatRoomId?: number) => {
  return useQuery<TravelPlan, AxiosError>({
    queryKey: ["useGetTravelPlan", chatRoomId],
    queryFn: () => api.get(travelApiRoute.travelPlan(chatRoomId || -1)),
    enabled: !!chatRoomId,
  });
};
