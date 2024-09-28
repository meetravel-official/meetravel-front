import Cookies from "js-cookie";

import { IGetKakaoLoginResponse } from "@/api/interfaces/kakaoSignUpInterface";

const accessTokenKey = "accessToken";
const userInfoKey = "userInfo";
const refreshTokenKey = "refreshToken";

export const setAccessTokenToCookie = (accessToken: string) => {
  Cookies.set(accessTokenKey, accessToken, { expires: 1 });
};

export const setRefreshTokenToCookie = (refreshToken: string) => {
  Cookies.set(refreshTokenKey, refreshToken, { expires: 14 });
};

export const setUserDataToCookie = (loginResponse: IGetKakaoLoginResponse) => {
  setAccessTokenToCookie(loginResponse.accessToken);
  Cookies.set(userInfoKey, JSON.stringify(loginResponse), {
    expires: 1,
  });
  setRefreshTokenToCookie(loginResponse.refreshToken);
};

export const getUserData: () => IGetKakaoLoginResponse = () => {
  const cookieUserInfo = Cookies.get(userInfoKey);
  if (cookieUserInfo) return JSON.parse(cookieUserInfo);
  return {};
};
