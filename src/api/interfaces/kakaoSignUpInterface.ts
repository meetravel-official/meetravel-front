export interface IGetKakaoLoginResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  grantType: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  registeredUserYn: boolean; // 회원인지 확인
  socialType: string;
  userId: string;
}

export interface IPostKaKaoSignUpRequest {
  userId: string;
  name: string;
  nickname: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  profileImageUrl: string;
  travelFrequency: string;
  scheduleType: string;
  planningType: string;
  mbti: string;
  hobby: string;
  intro: string;
  socialType: string;
}

export interface ISignUpEssentialForm {
  name: string;
  nickname: string;
  birthDayYear: string;
  birthDayMonth: string;
  birthDayDate: string;
  gender: string;
  phoneNumber: string;
  profileImageUrl: string;
}
