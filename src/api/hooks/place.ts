import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "../request";
import { placeApiRoute } from "../routes/apiRoutes";

export const usePostSharePlace = () => {
  return useMutation<object, AxiosError, string>({
    mutationFn: (placeId) => api.post(placeApiRoute.share(placeId || ""), {}),
    retry: false,
  });
};
