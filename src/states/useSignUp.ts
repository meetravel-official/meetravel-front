import { create } from "zustand";

interface ISignUpState {
  agreePrivacy: boolean;
  agreeTermsOfUse: boolean;
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  setAgreeTermsOfUse: (agreeTermsOfUse: boolean) => void;
}
export const useSignUpState = create<ISignUpState>((set) => {
  return {
    agreePrivacy: false,
    agreeTermsOfUse: false,
    setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
    setAgreeTermsOfUse: (agreeTermsOfUse) => set({ agreeTermsOfUse }),
  };
});
