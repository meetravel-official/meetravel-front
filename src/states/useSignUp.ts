import { create } from "zustand";

import { IProfile } from "@/api/interfaces/kakaoSignUpInterface";
import { SIGN_UP_GENDER_TYPE } from "@/constants/signUp";

interface ISignUpState {
  agreePrivacy: boolean;
  agreeTermsOfUse: boolean;
  profileInfo: IProfile;
  isDisabled: boolean;
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  setAgreeTermsOfUse: (agreeTermsOfUse: boolean) => void;
  setProfileInfo: (profileInfo: IProfile) => void;
  setDisabled: (isDisabled: boolean) => void;
}

export const useSignUpState = create<ISignUpState>((set) => {
  return {
    agreePrivacy: false,
    agreeTermsOfUse: false,
    disabledNextButton: true,
    isDisabled: false,
    profileInfo: {
      name: "",
      nickname: "",
      birthDayYear: "",
      birthDayMonth: "",
      birthDayDate: "",
      gender: SIGN_UP_GENDER_TYPE.FEMALE,
      phoneNumber: "",
      profileImageUrl: "",
    },
    setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
    setAgreeTermsOfUse: (agreeTermsOfUse) => set({ agreeTermsOfUse }),
    setProfileInfo: (profileInfo) => set({ profileInfo }),
    setDisabled: (isDisabled) => set({ isDisabled }),
  };
});
