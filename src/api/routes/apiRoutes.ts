import { API_URL, VISIT_KOREA_API_URL } from "../hosts";

const visitKoreaApiBaseRoute = {
  koreanVisitService: `${VISIT_KOREA_API_URL}/KorService1`, // 한국관광공사_국문 관광정보 서비스
};

export const apiRoute = {
  areaCode: `${visitKoreaApiBaseRoute.koreanVisitService}/areaCode1`, // 지역코드 조회
  areaBasedList: `${visitKoreaApiBaseRoute.koreanVisitService}/areaBasedList1`, // 지역기반 관광정보 조회
  detailCommon: `${visitKoreaApiBaseRoute.koreanVisitService}/detailCommon1`, // 공통정보 조회
  detailIntro: `${visitKoreaApiBaseRoute.koreanVisitService}/detailIntro1`, // 소개정보 조회
};

export const authApiRoute = {
  getAuthKakaoLogin: (authorizationCode: string) =>
    `${API_URL}/auth/kakao/login?authorizationCode=${authorizationCode}`, // 카카오 로그인 인가코드를 서버로 전송
};
