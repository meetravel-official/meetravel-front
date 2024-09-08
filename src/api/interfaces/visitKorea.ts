import { AxiosResponse } from "axios";

export interface IGetAriaCodeParams {
  areaCode?: string;
}

export interface IGetAreaBasedListParams {
  areaCode?: string;
  arrange?: string;
  contentTypeId?: string;
  sigunguCode?: string;
}

export interface IVisitKoreaListResponse<T> extends AxiosResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: T[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export interface IAriaCode {
  rnum: number;
  code: string;
  name: string;
}

export interface IAreaBasedList {
  addr1?: string;
  addr2?: string;
  areacode?: string;
  booktour?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  contentid?: string;
  contenttypeid?: string;
  createdtime?: string;
  firstimage?: string;
  firstimage2?: string;
  cpyrhtDivCd?: string;
  mapx?: string;
  mapy?: string;
  mlevel?: string;
  modifiedtime?: string;
  sigungucode: string;
  tel?: string;
  title?: string;
  zipcode?: string;
}
