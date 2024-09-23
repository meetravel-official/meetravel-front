import { create } from "zustand";

interface ISearch {
  area?: { code: string; label: string };
  order?: { code: string; label: string };
}

interface ISearchState {
  searchValue?: ISearch;
  setSearchValue: (searchValue: ISearch) => void;
}

export const useSearch = create<ISearchState>((set) => ({
  searchValue: undefined,
  setSearchValue: (searchValue) => set({ searchValue }),
}));
