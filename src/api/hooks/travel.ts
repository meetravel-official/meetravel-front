import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TravelKeywords, TravelPlan } from "../interfaces/travel";
import { api } from "../request";
import { travelApiRoute } from "../routes/apiRoutes";

export const useGetTravelPlan = (chatRoomId?: number) => {
  return useQuery<TravelPlan, AxiosError>({
    queryKey: ["useGetTravelPlan", chatRoomId],
    queryFn: () => api.get(travelApiRoute.travelPlan(chatRoomId || -1)),
    enabled: false,
  });
};

export const usePutTravelPlanKeywords = (chatRoomId?: number) => {
  return useMutation<unknown, AxiosError, TravelKeywords>({
    mutationFn: (travelKeywords) =>
      api.put(travelApiRoute.travelPlanKeywords(chatRoomId || -1), {
        travelKeywords,
      }),
    retry: false,
  });
};
