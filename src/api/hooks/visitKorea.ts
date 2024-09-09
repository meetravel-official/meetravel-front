// 한국 관광 공사 관련 api hook

import { useQuery } from "@tanstack/react-query";
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
          numOfRows: 999,
        },
        withCredentials: false,
      }),
  });
};

export const useGetAreaBasedList = (params?: IGetAreaBasedListParams) => {
  return useQuery<IVisitKoreaListResponse<IAreaBasedList>, AxiosError>({
    queryKey: ["useGetAreaBasedList", ...Object.values(params || {})],
    queryFn: () =>
      api.get(apiRoute.areaBasedList, {
        params: {
          MobileOS: "ETC",
          MobileApp: "미트래블",
          _type: "json",
          serviceKey: process.env.REACT_APP_KOREA_VISIT_API_DECODING_KEY,
          areaCode: params?.areaCode,
          contentTypeId: params?.contentTypeId,
          numOfRows: 100, //TODO: 무한 스크롤 적용 예정
        },
        withCredentials: false,
      }),
  });
};
