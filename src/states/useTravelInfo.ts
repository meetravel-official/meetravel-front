import { create } from "zustand";

import { IGetAreaBasedListParams } from "@/api/interfaces/visitKorea";

interface ITravelInfoSearchState extends IGetAreaBasedListParams {
  areaCodeLabel: string;
  contentTypeIdLabel: string;
}

interface ITravelInfoState {
  searchValue: ITravelInfoSearchState;
  setSearchValue: (searchValue: ITravelInfoSearchState) => void;
}

export const useTravelInfo = create<ITravelInfoState>((set) => ({
  searchValue: {
    contentTypeId: "",
    contentTypeIdLabel: "",
    areaCode: "",
    areaCodeLabel: "",
  },
  setSearchValue: (searchValue: ITravelInfoSearchState) => set({ searchValue }),
}));
