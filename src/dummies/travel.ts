import { TravelPlace } from "@/api/interfaces/travel";

export const dummyTravelInfo = {
  addr1: "경상북도 안동시 하회남촌길 69-5",
  addr2: "",
  areacode: "35",
  booktour: "",
  cat1: "B02",
  cat2: "B0201",
  cat3: "B02011600",
  contentid: "2465071",
  contenttypeid: "32",
  cpyrhtDivCd: "Type3",
  createdtime: "20161220190700",
  firstimage:
    "http://tong.visitkorea.or.kr/cms/resource/00/2626200_image2_1.jpg",
  firstimage2:
    "http://tong.visitkorea.or.kr/cms/resource/00/2626200_image3_1.jpg",
  mapx: "128.5175868107",
  mapy: "36.5376537450",
  mlevel: "6",
  modifiedtime: "20230413082505",
  sigungucode: "11",
  tel: "054-855-8552",
  title: "가경재 [한국관광 품질인증/Korea Quality]",
  zipcode: "36760",
};

export const dummyTravelPlace: TravelPlace = {
  placeId: dummyTravelInfo.contentid,
  placeAddress1: dummyTravelInfo.addr1,
  placeAddress2: dummyTravelInfo.addr2,
  placeImageUrl: dummyTravelInfo.firstimage,
  placeTitle: dummyTravelInfo.title,
  placeType: dummyTravelInfo.contenttypeid,
  isPicked: false,
};
