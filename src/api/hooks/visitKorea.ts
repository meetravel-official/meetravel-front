// 한국 관광 공사 관련 api hook

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  IAreaBasedList,
  IAriaCode,
  IGetAreaBasedListParams,
  IGetAriaCodeParams,
  IVisitKoreaListResponse,
} from "../interfaces/visitKorea";
import { api } from "../request";
import { apiRoute } from "../routes/apiRoutes";

export const useGetAreaCode = (params?: IGetAriaCodeParams) => {
  return useQuery<IVisitKoreaListResponse<IAriaCode>, AxiosError>({
    queryKey: ["useGetAreaCode", params?.areaCode],
    queryFn: () =>
      api.get(apiRoute.areaCode, {
        params: {
          MobileOS: "ETC",
          MobileApp: "미트래블",
          _type: "json",
          serviceKey: process.env.REACT_APP_KOREA_VISIT_API_DECODING_KEY,
          areaCode: params?.areaCode,
        },
        withCredentials: false,
      }),
  });
};

export const useGetAreaBasedList = (params?: IGetAreaBasedListParams) => {
  return useInfiniteQuery<IVisitKoreaListResponse<IAreaBasedList>, AxiosError>({
    queryKey: ["useGetAreaBasedList", ...Object.values(params || {})],
    queryFn: ({ pageParam }) =>
      api.get(apiRoute.areaBasedList, {
        params: {
          MobileOS: "ETC",
          MobileApp: "미트래블",
          _type: "json",
          serviceKey: process.env.REACT_APP_KOREA_VISIT_API_DECODING_KEY,
          areaCode: params?.areaCode,
          contentTypeId: params?.contentTypeId,
          numOfRows: 10,
          pageNo: pageParam,
          arrange: "O",
        },
        withCredentials: false,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.response.body.pageNo;
      const maxPage = Math.ceil(lastPage.data.response.body.totalCount / 10);
      if (currentPage < maxPage) return currentPage + 1;
    },
    getPreviousPageParam: (firstPage) => {
      const currentPage = firstPage.data.response.body.pageNo;
      if (currentPage > 1) return firstPage.data.response.body.pageNo - 1;
    },
  });
};
