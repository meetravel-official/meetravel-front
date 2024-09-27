import { create } from "zustand";

interface IChatState {
  userId?: string;
  setUserId: (userId: string) => void;
  resetUserId: () => void;
}

export const useChatState = create<IChatState>((set) => ({
  userId: undefined,
  setUserId: (userId: string) => set({ userId }),
  resetUserId: () => set({ userId: undefined }),
}));
