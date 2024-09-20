/* eslint-disable @typescript-eslint/no-explicit-any */
// 로그인, 로그아웃, 회원탈퇴 관련 api

import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useKakaoAuthState, useUserState } from "states/useCheckUser";

import { pageRoutes } from "@/routes";

import { IGetKakaoLoginResponse } from "../interfaces/kakaoSignUpInterface";
import { api } from "../request";
import { authApiRoute } from "../routes/apiRoutes";

export const usePostKakaoLogin = () => {
  const { setRequestToKakao } = useKakaoAuthState();
  const { setUserInfo } = useUserState();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (
      authorizationCode: string
    ): Promise<AxiosResponse<any, any>> => {
      return api.post(
        authApiRoute.getAuthKakaoLogin(authorizationCode),
        undefined
      );
    },
    onSuccess: (data: AxiosResponse) => {
      const response = data.data as IGetKakaoLoginResponse;
      setRequestToKakao(false);
      setUserInfo(data.data);
      // if (response.registeredUserYn) {
      // TODO: 회원가입, 로그인 이후 쿠키를 저장하는 로직으로 분리 예정
      const accessTokenExpiresAt = new Date(response.accessTokenExpiresAt);
      const refreshTokenExpiresAt = new Date(response.refreshTokenExpiresAt);

      Cookies.set("accessToken", response.accessToken, {
        expires: new Date(
          accessTokenExpiresAt.setDate(accessTokenExpiresAt.getDate() + 1)
        ),
      });
      Cookies.set("refreshToken", response.refreshToken, {
        expires: new Date(
          refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 1)
        ),
      });
      console.log("response", response.userId);
      // navigate(pageRoutes.ROOT);
      // } else {
      navigate(pageRoutes.SIGN_UP);
      // }
    },
    onError: (error) => {
      console.error("Kakao SignIn is Failed.", error);
      setRequestToKakao(false);
    },
  });
};
