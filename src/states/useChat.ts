import { create } from "zustand";

import { useGetChatUsers } from "@/api/hooks/chat";
import { IChatUserData, IUserDetailData } from "@/api/interfaces/chat";

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

interface IReportReasonModalState {
  isOpenReportReasonModal: boolean;
  handleOnOpenReportReasonModal: () => void;
  handleOnCloseReportReasonModal: () => void;
}

export const useReportReasonModal = create<IReportReasonModalState>((set) => ({
  isOpenReportReasonModal: false,
  handleOnOpenReportReasonModal: () => set({ isOpenReportReasonModal: true }),
  handleOnCloseReportReasonModal: () => set({ isOpenReportReasonModal: false }),
}));

interface IProfileState {
  profileData: IUserDetailData;
  setProfileData: (data: IUserDetailData) => void;
}

export const useChatProfile = create<IProfileState>((set) => ({
  profileData: {
    userId: "",
    nickname: "",
    profileImageUrl: "",
    birthDate: "",
    gender: "남성",
  },
  setProfileData: (profileData: IUserDetailData) => set({ profileData }),
}));

interface IChatUsersState {
  chatUsersData?: IChatUserData;
  setChatUsersData: (data: IChatUserData) => void;
}

export const useChatUsers = create<IChatUsersState>((set) => ({
  chatUsersData: undefined,
  setChatUsersData: (ChatUsersData: IChatUserData) =>
    set({ chatUsersData: ChatUsersData }),
}));

interface ISingleReportModalState {
  isOpenSingleReportModal: boolean;
  handleOnOpenSingleReportModal: () => void;
  handleOnCloseSingleReportModal: () => void;
}

export const useSingleReportModal = create<ISingleReportModalState>((set) => ({
  isOpenSingleReportModal: false,
  handleOnOpenSingleReportModal: () => set({ isOpenSingleReportModal: true }),
  handleOnCloseSingleReportModal: () => set({ isOpenSingleReportModal: false }),
}));

interface IProfileFullModalState {
  isOpenProfileFullModal: boolean;
  handleOnOpenProfileFullModal: () => void;
  handleOnCloseProfileFullModal: () => void;
}

export const useProfileFullModal = create<IProfileFullModalState>((set) => ({
  isOpenProfileFullModal: false,
  handleOnOpenProfileFullModal: () => set({ isOpenProfileFullModal: true }),
  handleOnCloseProfileFullModal: () => set({ isOpenProfileFullModal: false }),
}));
