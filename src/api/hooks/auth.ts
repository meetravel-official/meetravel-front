/* eslint-disable @typescript-eslint/no-explicit-any */
// 로그인, 로그아웃, 회원탈퇴 관련 api

import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useKakaoAuthState, useUserState } from "states/useCheckUser";

import { SIGN_UP_SOCIAL_TYPE } from "@/constants/signUp";
import { pageRoutes } from "@/routes";

import {
  IGetKakaoLoginResponse,
  IPostKaKaoSignUpRequest,
} from "../interfaces/kakaoSignUpInterface";
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
        authApiRoute.postAuthKakaoLogin(authorizationCode),
        undefined
      );
    },
    onSuccess: (data: AxiosResponse) => {
      const response = data.data as IGetKakaoLoginResponse;
      setRequestToKakao(false);
      setUserInfo(data.data);
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
      if (response.registeredUserYn) {
        navigate(pageRoutes.ROOT);
      } else {
        navigate(pageRoutes.SIGN_UP);
      }
    },
    onError: (error) => {
      console.error("Kakao SignIn is Failed.", error);
      setRequestToKakao(false);
    },
  });
};

export const usePostSignUp = () => {
  const { userInfo } = useUserState();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (
      signUpInfo: IPostKaKaoSignUpRequest
    ): Promise<AxiosResponse<any, any>> => {
      const requestData = {
        userId: userInfo?.userId,
        socialType: SIGN_UP_SOCIAL_TYPE.KAKAO,
        ...signUpInfo,
      } as IPostKaKaoSignUpRequest;
      return api.post(authApiRoute.postSignUp, requestData);
    },
    onSuccess: (res: AxiosResponse) => {
      console.log("회원가입을 성공했습니다.", res);
      navigate(pageRoutes.ROOT);
    },
    onError: (error) => {
      console.error("회원가입을 실패했습니다.", error);
    },
  });
};
