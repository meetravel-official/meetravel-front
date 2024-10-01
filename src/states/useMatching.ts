import { create } from "zustand";

interface IMatchingProcessModalState {
  isOpenMatchingProcessModal: boolean;
  handleOnOpenMatchingProcessModal: () => void;
  handleOnCloseMatchingProcessModal: () => void;
}

export const useMatchingProcessModal = create<IMatchingProcessModalState>(
  (set) => ({
    isOpenMatchingProcessModal: false,
    handleOnOpenMatchingProcessModal: () =>
      set({ isOpenMatchingProcessModal: true }),
    handleOnCloseMatchingProcessModal: () =>
      set({ isOpenMatchingProcessModal: false }),
  })
);

interface IEditModalState {
  isOpenEditModal: boolean;
  handleOnOpenEditModal: () => void;
  handleOnCloseEditModal: () => void;
}

export const useEditModal = create<IEditModalState>((set) => ({
  isOpenEditModal: false,
  handleOnOpenEditModal: () => set({ isOpenEditModal: true }),
  handleOnCloseEditModal: () => set({ isOpenEditModal: false }),
}));

interface IMatchingModalState {
  isOpenMatchingModal: boolean;
  handleOnOpenMatchingModal: () => void;
  handleOnCloseMatchingModal: () => void;
}

export const useMatchingModal = create<IMatchingModalState>((set) => ({
  isOpenMatchingModal: false,
  handleOnOpenMatchingModal: () => set({ isOpenMatchingModal: true }),
  handleOnCloseMatchingModal: () => set({ isOpenMatchingModal: false }),
}));
