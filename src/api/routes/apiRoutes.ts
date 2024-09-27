import { API_URL, VISIT_KOREA_API_URL } from "../hosts";

const visitKoreaApiBaseRoute = {
  koreanVisitService: `${VISIT_KOREA_API_URL}/KorService1`, // 한국관광공사_국문 관광정보 서비스
  photoGalleryService: `${VISIT_KOREA_API_URL}/PhotoGalleryService1`, // 한국관광공사_관광사진 정보 서비스
};

export const apiRoute = {
  areaCode: `${visitKoreaApiBaseRoute.koreanVisitService}/areaCode1`, // 지역코드 조회
  areaBasedList: `${visitKoreaApiBaseRoute.koreanVisitService}/areaBasedList1`, // 지역기반 관광정보 조회
  detailCommon: `${visitKoreaApiBaseRoute.koreanVisitService}/detailCommon1`, // 공통정보 조회
  detailIntro: `${visitKoreaApiBaseRoute.koreanVisitService}/detailIntro1`, // 소개정보 조회
  gallerySearchList: `${visitKoreaApiBaseRoute.photoGalleryService}/gallerySearchList1`, // 관광사진 갤러리 키워드 검색 목록 조회
};

export const chatApiRoute = {
  chatRooms: `${API_URL}/chat-rooms`, //내 채팅방 목록
  chatRooms__join: `${API_URL}/chat-rooms/join`, //채팅방 입장
  chatRooms__leave: `${API_URL}/chat-rooms/leave`, //채팅방 퇴장
};

export const authApiRoute = {
  postAuthKakaoLogin: ({
    authorizationCode,
    redirectUri,
  }: {
    authorizationCode: string;
    redirectUri: string;
  }) =>
    `${API_URL}/auth/kakao/login?authorizationCode=${authorizationCode}&redirectUri=${redirectUri}`, // 카카오 로그인 인가코드를 서버로 전송
  postSignUp: `${API_URL}/signup`, // 회원가입
  postLogOut: `${API_URL}/users/logout`, // 로그아웃
  getMyPage: (userId: string) => `${API_URL}/users/${userId}/my-page`, // 마이페이지 조회
  getCheckNickname: (nickName: string) =>
    `${API_URL}/signup/check-nickname?nickName=${nickName}`, // 닉네임 중복 확인
  userInfo: (userId: string) => `${API_URL}/users/${userId}/info`,
  userNickname: (userId: string) => `${API_URL}/users/${userId}/nickname`,
};
