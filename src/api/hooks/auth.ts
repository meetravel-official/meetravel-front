/* eslint-disable @typescript-eslint/no-explicit-any */
// 로그인, 로그아웃, 회원탈퇴 관련 api

import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useKakaoAuthState } from "states/useCheckUser";
import { getUserData, setUserDataToCookie } from "utils/token-utils";

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
  const navigate = useNavigate();

  return useMutation<AxiosResponse<IGetKakaoLoginResponse>, AxiosError, string>(
    {
      mutationFn: (authorizationCode: string) => {
        return api.post(
          authApiRoute.postAuthKakaoLogin(authorizationCode),
          undefined
        );
      },
      onSuccess: (data) => {
        const response = data.data;
        setRequestToKakao(false);
        setUserDataToCookie(response);

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
    }
  );
};

export const usePostSignUp = () => {
  const userInfo = getUserData();
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

export const usePostKaKaoSignOut = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (): Promise<AxiosResponse<any, any>> => {
      return api.post(authApiRoute.postLogOut, undefined);
    },
    onSuccess: () => {
      console.log("로그아웃을 성공했습니다.");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate(pageRoutes.SIGN_IN);
    },
    onError: (error) => {
      console.error("로그아웃을 실패했습니다.", error);
    },
  });
};

export const useGetCheckNickname = () => {
  return useMutation({
    mutationFn: (nickName: string): Promise<AxiosResponse<any, any>> => {
      return api.get(authApiRoute.getCheckNickname(nickName));
    },
    onSuccess: (res: AxiosResponse) => {
      console.log("닉네임 중복 확인을 성공했습니다.", res);
    },
    onError: (error) => {
      console.error("닉네임 중복 확인을 실패했습니다.", error);
    },
  });
};
