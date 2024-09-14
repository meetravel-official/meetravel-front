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
  data: {
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

export interface IDetailCommon {
  overview?: string;
  contentid?: string;
  sigungucode?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  addr1?: string;
  addr2?: string;
  zipcode?: string;
  mapx?: string;
  mapy?: string;
  mlevel?: string;
  cpyrhtDivCd?: string;
  contenttypeid?: string;
  booktour?: string;
  createdtime?: string;
  homepage?: string;
  modifiedtime?: string;
  tel?: string;
  telname?: string;
  title?: string;
  firstimage?: string;
  firstimage2?: string;
  areacode?: string;
}

export interface IDetailIntro {
  chkcreditcardculture?: string;
  scaleleports?: string;
  usefeeleports?: string;
  discountinfofestival?: string;
  chkcreditcardfood?: string;
  eventenddate?: string;
  playtime?: string;
  chkbabycarriageculture?: string;
  roomcount?: string;
  reservationlodging?: string;
  reservationurl?: string;
  roomtype?: string;
  scalelodging?: string;
  subfacility?: string;
  barbecue?: string;
  beauty?: string;
  beverage?: string;
  bicycle?: string;
  campfire?: string;
  fitness?: string;
  placeinfo?: string;
  parkinglodging?: string;
  pickup?: string;
  publicbath?: string;
  opendate?: string;
  parking?: string;
  restdate?: string;
  usetimeleports?: string;
  foodplace?: string;
  goodstay?: string;
  hanok?: string;
  infocenterlodging?: string;
  eventhomepage?: string;
  eventplace?: string;
  parkingleports?: string;
  reservation?: string;
  restdateleports?: string;
  eventstartdate?: string;
  festivalgrade?: string;
  karaoke?: string;
  discountinfofood?: string;
  firstmenu?: string;
  infocenterfood?: string;
  kidsfacility?: string;
  opendatefood?: string;
  opentimefood?: string;
  packing?: string;
  parkingfood?: string;
  reservationfood?: string;
  restdatefood?: string;
  scalefood?: string;
  seat?: string;
  smoking?: string;
  treatmenu?: string;
  lcnsno?: string;
  contentid?: string;
  contenttypeid?: string;
  accomcount?: string;
  chkbabycarriage?: string;
  chkcreditcard?: string;
  chkpet?: string;
  expagerange?: string;
  expguide?: string;
  heritage1?: string;
  heritage2?: string;
  heritage3?: string;
  infocenter?: string;
  taketime?: string;
  theme?: string;
  accomcountleports?: string;
  chkbabycarriageleports?: string;
  chkcreditcardleports?: string;
  chkpetleports?: string;
  expagerangeleports?: string;
  infocenterleports?: string;
  openperiod?: string;
  parkingfeeleports?: string;
  program?: string;
  spendtimefestival?: string;
  sponsor1?: string;
  sponsor1tel?: string;
  chkpetculture?: string;
  discountinfo?: string;
  infocenterculture?: string;
  parkingculture?: string;
  parkingfee?: string;
  restdateculture?: string;
  usefee?: string;
  usetimeculture?: string;
  scale?: string;
  spendtime?: string;
  agelimit?: string;
  bookingplace?: string;
  useseason?: string;
  usetime?: string;
  accomcountculture?: string;
  sponsor2?: string;
  sponsor2tel?: string;
  subevent?: string;
  usetimefestival?: string;
  distance?: string;
  infocentertourcourse?: string;
  schedule?: string;
  publicpc?: string;
  sauna?: string;
  seminar?: string;
  sports?: string;
  refundregulation?: string;
  chkbabycarriageshopping?: string;
  chkcreditcardshopping?: string;
  chkpetshopping?: string;
  culturecenter?: string;
  fairday?: string;
  infocentershopping?: string;
  opendateshopping?: string;
  opentime?: string;
  parkingshopping?: string;
  restdateshopping?: string;
  restroom?: string;
  saleitem?: string;
  saleitemcost?: string;
  scaleshopping?: string;
  shopguide?: string;
  checkintime?: string;
  checkouttime?: string;
  chkcooking?: string;
  accomcountlodging?: string;
  benikia?: string;
}
