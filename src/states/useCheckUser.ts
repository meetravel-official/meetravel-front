import { create } from "zustand";

import { IGetKakaoLoginResponse } from "@/api/interfaces/kakaoSignUpInterface";

interface IUseUserState {
  userInfo?: IGetKakaoLoginResponse;
  setUserInfo: (userInfo?: IGetKakaoLoginResponse) => void;
}

interface IKakaoAuthState {
  requestToKakao: boolean;
  setRequestToKakao: (value: boolean) => void;
}

export const useUserState = create<IUseUserState>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo?: IGetKakaoLoginResponse) => set({ userInfo }),
}));

export const useKakaoAuthState = create<IKakaoAuthState>((set) => ({
  requestToKakao: true,
  setRequestToKakao: (requestToKakao: boolean) => set({ requestToKakao }),
}));
