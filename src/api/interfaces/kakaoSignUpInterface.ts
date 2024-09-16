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
