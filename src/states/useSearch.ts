import { create } from "zustand";

import { ISearchChat } from "@/api/interfaces/chat";

const defaultSearchValue: ISearchChat = {
  sort: "CREATED_LATEST",
};

interface ISearchState {
  searchValue: ISearchChat;
  setSearchValue: (searchValue: ISearchChat) => void;
}

export const useSearch = create<ISearchState>((set) => ({
  searchValue: defaultSearchValue,
  setSearchValue: (searchValue) => set({ searchValue }),
}));
