import { TrackListSettings } from "@/shared/model";

export const URL_PARAMS_KEYS: Record<keyof TrackListSettings, string> = {
  sortKey: "sortKey",
  sortOrder: "sortOrder",
  artistFilter: "artistFilter",
  genreFilter: "genreFilter",
  search: "search",
  page: "page",
} as const;
