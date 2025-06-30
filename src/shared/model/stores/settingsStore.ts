import { create } from "zustand";
import { SettingsStore } from "../types/settingsStore";
import { PAGINATION_PAGE_SIZE } from "@/shared/lib";
import { PAGINATION_MIN_INDEX } from "@/shared/lib/constants";

const settingsStore = create<SettingsStore>()((set) => ({
  sorting: [],
  pagination: {
    pageIndex: PAGINATION_MIN_INDEX,
    pageSize: PAGINATION_PAGE_SIZE,
  },
  selections: {},
  filters: {
    artist: "",
    genres: "",
  },
  searchText: "",
  isSearching: false,
  actions: {
    setSorting: (value) => set({ sorting: value }),
    setPagination: (value) => set({ pagination: value }),
    setSelections: (value) => set({ selections: value }),
    setFilters: (value) => set({ filters: value }),
    setSearchText: (value) => set({ searchText: value }),
    setIsSearching: (value) => set({ isSearching: value }),
  },
}));

export const useSorting = () => settingsStore((state) => state.sorting);
export const usePagination = () => settingsStore((state) => state.pagination);
export const useFilters = () => settingsStore((state) => state.filters);
export const useSearchText = () => settingsStore((state) => state.searchText);
export const useIsSearching = () => settingsStore((state) => state.isSearching);
export const useSelections = () => settingsStore((state) => state.selections);
export const useSettingsActions = () => settingsStore((state) => state.actions);
