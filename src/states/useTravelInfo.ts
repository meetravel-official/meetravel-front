import { create } from "zustand";

import {
  IAreaBasedList,
  IGetAreaBasedListParams,
} from "@/api/interfaces/visitKorea";

interface ITravelInfoSearchState extends IGetAreaBasedListParams {
  areaCodeLabel: string;
  contentTypeIdLabel: string;
}

interface ITravelInfoState {
  searchValue: ITravelInfoSearchState;
  setSearchValue: (searchValue: ITravelInfoSearchState) => void;
  selectedContent?: IAreaBasedList;
  setSelectedContent: (content: IAreaBasedList) => void;
  isOpenTravelInfoDetailModal: boolean;
  setIsOpenTravelInfoDetailModal: (isOpen: boolean) => void;
}

export const useTravelInfo = create<ITravelInfoState>((set) => ({
  searchValue: {
    contentTypeId: "",
    contentTypeIdLabel: "",
    areaCode: "",
    areaCodeLabel: "",
  },
  selectedContent: undefined,
  isOpenTravelInfoDetailModal: false,
  setSearchValue: (searchValue: ITravelInfoSearchState) => set({ searchValue }),
  setSelectedContent: (selectedContent: IAreaBasedList) =>
    set({ selectedContent }),
  setIsOpenTravelInfoDetailModal: (isOpenTravelInfoDetailModal: boolean) =>
    set({ isOpenTravelInfoDetailModal }),
}));
