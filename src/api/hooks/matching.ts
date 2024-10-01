import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { IMatchingForm, IUpdateMatchingForm } from "../interfaces/matching";
import { api } from "../request";
import { matchingApiRoute } from "../routes/apiRoutes";

export const usePostMatchingForm = () => {
  return useMutation<AxiosResponse, AxiosError, IMatchingForm>({
    mutationFn: (params: IMatchingForm) => {
      return api.post(matchingApiRoute.matchingForm, params);
    },
  });
};

interface IMatchingResult {
  matchingFormId: string | null;
}

export const useGetMatchingResult = (matchingFormId: number) => {
  return useQuery<IMatchingResult, AxiosError>({
    queryKey: ["useGetMatchingResult"],
    queryFn: () =>
      api.get(`${matchingApiRoute.matchingForm__match}/${matchingFormId}`),
    enabled: false,
  });
};

export interface IMatchingFormResponse extends IMatchingForm {
  matchingFormId: number;
}

export const useGetMatchingForm = () => {
  return useQuery<IMatchingFormResponse, AxiosError>({
    queryKey: ["useGetMatchingForm"],
    queryFn: () => api.get(matchingApiRoute.matchingForm),
    enabled: false,
  });
};
