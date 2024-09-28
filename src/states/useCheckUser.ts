import { create } from "zustand";

interface IKakaoAuthState {
  requestToKakao: boolean;
  setRequestToKakao: (value: boolean) => void;
}

export const useKakaoAuthState = create<IKakaoAuthState>((set) => ({
  requestToKakao: true,
  setRequestToKakao: (requestToKakao: boolean) => set({ requestToKakao }),
}));
