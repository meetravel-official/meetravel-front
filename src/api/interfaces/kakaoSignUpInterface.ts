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
  userId?: string;
  name?: string;
  nickname?: string;
  birthDate?: string;
  gender?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  travelFrequency?: string;
  scheduleType?: string;
  planningType?: string;
  mbti?: string;
  hobby?: string;
  intro?: string;
  socialType?: string;
}

export interface ISignUpEssentialForm {
  name?: string;
  nickname?: string;
  birthDayYear?: string;
  birthDayMonth?: string;
  birthDayDate?: string;
  gender?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
}

export interface ISignUpTravelProfileForm {
  travelFrequency?: string; // 여행 빈도
  scheduleType?: string; // 여행 취향, 빠듯하게 | 여유롭게
  planningType?: string; // 여행 취향, 계획적으로 | 즉흥적으로
  hobby?: string;
  mbti?: string;
  intro?: string; // 한 줄 자기소개
}
