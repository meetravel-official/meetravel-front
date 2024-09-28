import { create } from "zustand";

interface ILeaveModalState {
  isOpenLeaveModal: boolean;
  handleOnOpenLeaveModal: () => void;
  handleOnCloseLeaveModal: () => void;
}

export const useLeaveModal = create<ILeaveModalState>((set) => ({
  isOpenLeaveModal: false,
  handleOnOpenLeaveModal: () => set({ isOpenLeaveModal: true }),
  handleOnCloseLeaveModal: () => set({ isOpenLeaveModal: false }),
}));

interface IReportModalState {
  isOpenReportModal: boolean;
  handleOnOpenReportModal: () => void;
  handleOnCloseReportModal: () => void;
}

export const useReportModal = create<IReportModalState>((set) => ({
  isOpenReportModal: false,
  handleOnOpenReportModal: () => set({ isOpenReportModal: true }),
  handleOnCloseReportModal: () => set({ isOpenReportModal: false }),
}));

interface IProfileModalState {
  isOpenProfileModal: boolean;
  handleOnOpenProfileModal: () => void;
  handleOnCloseProfileModal: () => void;
}

export const useProfileModal = create<IProfileModalState>((set) => ({
  isOpenProfileModal: false,
  handleOnOpenProfileModal: () => set({ isOpenProfileModal: true }),
  handleOnCloseProfileModal: () => set({ isOpenProfileModal: false }),
}));
