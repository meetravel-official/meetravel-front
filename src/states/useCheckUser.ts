import { create } from "zustand";

import {
  IGetKakaoLoginResponse,
  ISignUpEssentialForm,
  ISignUpTravelProfileForm,
} from "@/api/interfaces/kakaoSignUpInterface";

interface IUseUserState {
  userInfo?: IGetKakaoLoginResponse;
  setUserInfo: (userInfo?: IGetKakaoLoginResponse) => void;
}

interface IKakaoAuthState {
  requestToKakao: boolean;
  setRequestToKakao: (value: boolean) => void;
}

export type ISignUpFormValues = ISignUpEssentialForm & ISignUpTravelProfileForm;

interface ISighUpFormState {
  signUpInfo?: ISignUpFormValues;
  setSignUpInfo: (signUpInfo?: ISignUpFormValues) => void;
}

export const useUserState = create<IUseUserState>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo?: IGetKakaoLoginResponse) => set({ userInfo }),
}));

export const useKakaoAuthState = create<IKakaoAuthState>((set) => ({
  requestToKakao: true,
  setRequestToKakao: (requestToKakao: boolean) => set({ requestToKakao }),
}));

export const useSignUpFormState = create<ISighUpFormState>((set) => ({
  signUpInfo: undefined,
  setSignUpInfo: (signUpInfo?: ISignUpFormValues) => set({ signUpInfo }),
}));
