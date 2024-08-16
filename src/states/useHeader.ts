import { create } from "zustand";

interface IHeaderState {
  title?: string;
  setTitle: (title: string) => void;
  resetTitle: () => void;
}

export const useHeaderState = create<IHeaderState>((set) => ({
  title: undefined,
  setTitle: (title: string) => set({ title }),
  resetTitle: () => set({ title: undefined }),
}));
