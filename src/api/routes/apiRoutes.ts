import { VISIT_KOREA_API_URL } from "../hosts";

const visitKoreaApiBaseRoute = {
  koreanVisitService: `${VISIT_KOREA_API_URL}/KorService1`, // 한국관광공사_국문 관광정보 서비스
};

export const apiRoute = {
  areaCode: `${visitKoreaApiBaseRoute.koreanVisitService}/areaCode1`, // 지역코드 조회
  areaBasedList: `${visitKoreaApiBaseRoute.koreanVisitService}/areaBasedList1`, // 지역기반 관광정보 조회
};
