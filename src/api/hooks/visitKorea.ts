// 한국 관광 공사 관련 api hook

import {
  useInfiniteQuery,
  useQueries,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  IAreaBasedList,
  IAriaCode,
  IDetailCommon,
  IDetailIntro,
  IGalleryImage,
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
      const currentPage = lastPage?.data?.response?.body?.pageNo;
      const maxPage = Math.ceil(
        lastPage?.data?.response?.body?.totalCount / 10
      );
      if (currentPage && maxPage && currentPage < maxPage)
        return currentPage + 1;
    },
    getPreviousPageParam: (firstPage) => {
      const currentPage = firstPage?.data?.response?.body?.pageNo;
      if (currentPage && currentPage > 1)
        return firstPage?.data?.response?.body?.pageNo - 1;
    },
  });
};

export const useGetDetailCommon = (contentId?: string) => {
  return useQuery<IVisitKoreaListResponse<IDetailCommon>, AxiosError>({
    queryKey: ["useGetDetailCommon", contentId],
    queryFn: () =>
      api.get(apiRoute.detailCommon, {
        params: {
          MobileOS: "ETC",
          MobileApp: "미트래블",
          _type: "json",
          serviceKey: process.env.REACT_APP_KOREA_VISIT_API_DECODING_KEY,
          overviewYN: "N", // 콘텐츠 개요 조회 여부
          firstImageYN: "Y", // 대표이미지 조회 여부
          addrinfoYN: "Y", // 주소 조회 여부
          mapinfoYN: "Y", // 좌표 조회 여부
          defaultYN: "Y", // 기본정보 조회 여부
          contentId,
        },
        withCredentials: false,
      }),
    enabled: !!contentId,
  });
};

export const useGetDetailIntro = (params?: {
  contentId?: string;
  contentTypeId?: string;
}) => {
  return useQuery<IVisitKoreaListResponse<IDetailIntro>, AxiosError>({
    queryKey: ["useGetDetailIntro", params?.contentId, params?.contentTypeId],
    queryFn: () =>
      api.get(apiRoute.detailIntro, {
        params: {
          MobileOS: "ETC",
          MobileApp: "미트래블",
          _type: "json",
          serviceKey: process.env.REACT_APP_KOREA_VISIT_API_DECODING_KEY,
          contentId: params?.contentId,
          contentTypeId: params?.contentTypeId,
        },
        withCredentials: false,
      }),
    enabled: !!params?.contentId && !!params?.contentTypeId,
  });
};

export const useGetGallerySearchList = (keyword?: string) => {
  return useQuery<IVisitKoreaListResponse<IGalleryImage>, AxiosError>({
    queryKey: ["useGetGallerySearchList", keyword],
    queryFn: () =>
      api.get(apiRoute.gallerySearchList, {
        params: {
          MobileOS: "ETC",
          MobileApp: "미트래블",
          _type: "json",
          serviceKey: process.env.REACT_APP_KOREA_VISIT_API_DECODING_KEY,
          numOfRows: 1,
          keyword,
        },
        withCredentials: false,
      }),
    enabled: !!keyword,
  });
};

export const useGetGallerySearchListByKeywordList = (
  keywordList?: string[]
) => {
  return useQueries<
    UseQueryOptions<IVisitKoreaListResponse<IGalleryImage>>[],
    (IGalleryImage[] | undefined)[]
  >({
    queries: keywordList
      ? keywordList?.map((keyword) => ({
          queryKey: ["useGetGallerySearchList", keyword],
          queryFn: () =>
            api.get(apiRoute.gallerySearchList, {
              params: {
                MobileOS: "ETC",
                MobileApp: "미트래블",
                _type: "json",
                serviceKey: process.env.REACT_APP_KOREA_VISIT_API_DECODING_KEY,
                numOfRows: 1,
                keyword,
              },
              withCredentials: false,
            }),
          enabled: !!keyword,
        }))
      : [],
    combine: (resultList) => {
      return resultList.map(
        (result) => result.data?.data.response.body.items.item
      );
    },
  });
};
