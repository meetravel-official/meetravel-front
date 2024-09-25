import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { GetMyPageResponse } from "../interfaces/user";
import { api } from "../request";
import { authApiRoute } from "../routes/apiRoutes";

export const useGetMyPage = (userId?: string) => {
  return useQuery<GetMyPageResponse, AxiosError>({
    queryKey: ["useGetMyPage", userId],
    queryFn: () => api.get(authApiRoute.getMyPage(userId || "")),
    enabled: !!userId,
  });
};
