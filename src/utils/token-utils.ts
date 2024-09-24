import Cookies from "js-cookie";

import { IGetKakaoLoginResponse } from "@/api/interfaces/kakaoSignUpInterface";

const accessTokenKey = "accessToken";
const userInfoKey = "userInfo";
const refreshTokenKey = "refreshToken";

export const setUserDataToCookie = (loginResponse: IGetKakaoLoginResponse) => {
  const accessTokenExpiresAtDate = new Date(loginResponse.accessTokenExpiresAt);
  const refreshTokenExpiresAtDate = new Date(
    loginResponse.refreshTokenExpiresAt
  );

  Cookies.set(accessTokenKey, loginResponse.accessToken, {
    expires: new Date(
      accessTokenExpiresAtDate.setDate(accessTokenExpiresAtDate.getDate() + 1)
    ),
  });
  Cookies.set(userInfoKey, JSON.stringify(loginResponse), {
    expires: new Date(
      accessTokenExpiresAtDate.setDate(accessTokenExpiresAtDate.getDate() + 1)
    ),
  });
  Cookies.set(refreshTokenKey, loginResponse.refreshToken, {
    expires: new Date(
      refreshTokenExpiresAtDate.setDate(refreshTokenExpiresAtDate.getDate() + 1)
    ),
  });
};

export const getUserData: () => IGetKakaoLoginResponse = () => {
  return JSON.parse(Cookies.get(userInfoKey) || "");
};
