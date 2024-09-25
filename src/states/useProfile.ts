import { create } from "zustand";

interface IProfileState {
  isOpenEditModal: boolean;
  handleOnOpenEditModal: () => void;
  handleOnCloseEditModal: () => void;
}

export const useProfile = create<IProfileState>((set) => ({
  isOpenEditModal: false,
  handleOnOpenEditModal: () => set({ isOpenEditModal: true }),
  handleOnCloseEditModal: () => set({ isOpenEditModal: false }),
}));
