import { create } from "zustand";

interface IUseUserState {
  userToken?: string;
  setUserToken: (userToken?: string) => void;
}

export const useUserState = create<IUseUserState>((set) => ({
  userToken: undefined,
  setUserToken: (userToken?: string) => set({ userToken }),
}));
