import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { SampleDto, SampleResponse } from '../interfaces/sampleInterface';
import { api } from '../request';
import { apiRoute } from '../routes/apiRoutes';

export const useFetchSample = () => {
  return useQuery<SampleResponse, AxiosError>({
    queryKey: ['useFetchSample'],
    queryFn: () => api.get(apiRoute.sample),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const usePostSample = () => {
  return useMutation<SampleResponse, AxiosError, SampleDto>({
    mutationFn: (data) => api.post(apiRoute.sample, data),
    retry: false,
  });
};
