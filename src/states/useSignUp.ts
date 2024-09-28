import { create } from "zustand";

import { StepInstance } from "@/components/Step/StepInterface";

interface ISignUpState {
  step?: StepInstance;
  agreePrivacy: boolean;
  agreeTermsOfUse: boolean;
  nextButtonProps: {
    disabled?: boolean;
    onClick?: () => void;
  };
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  setAgreeTermsOfUse: (agreeTermsOfUse: boolean) => void;
  setNextButtonProps: ({
    disabled,
    onClick,
  }: {
    disabled?: boolean;
    onClick?: () => void;
  }) => void;
}
export const useSignUpState = create<ISignUpState>((set, get) => {
  return {
    step: undefined,
    agreePrivacy: false,
    agreeTermsOfUse: false,
    disabledNextButton: true,
    nextButtonProps: {
      disabled: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
    },
    setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
    setAgreeTermsOfUse: (agreeTermsOfUse) => set({ agreeTermsOfUse }),
    setNextButtonProps: ({ disabled, onClick }) =>
      set({ nextButtonProps: { ...get().nextButtonProps, disabled, onClick } }),
  };
});
