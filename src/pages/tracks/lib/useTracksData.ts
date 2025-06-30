import { useEffect } from "react";
import { toast } from "sonner";
import { GENRE_API_ERROR_MESSAGES, useGenresQuery } from "@/entities/genres";
import { TRACk_API_ERROR_MESSAGES } from "@/entities/track";
import {
  SortKey,
  useFilters,
  usePagination,
  useSearchText,
  useSettingsActions,
  useSorting,
} from "@/shared/model";
import { unwrapQueryResult, useDebounce } from "@/shared/lib";
import { useTracksQuery } from "../api/useTracksQuery";

export const useTracksData = () => {
  const sorting = useSorting();
  const filters = useFilters();
  const pagination = usePagination();
  const searchText = useSearchText();
  const debouncedSearchText = useDebounce(searchText, 500);
  const { setSorting, setFilters, setPagination, setIsSearching } =
    useSettingsActions();
  const { genresResult, isLoadingGenres } = useGenresQuery();
  const { tracksResult, isLoadingTracks } = useTracksQuery({
    pagination,
    sorting: {
      sortBy: sorting[0]?.id as SortKey,
      order: sorting[0]?.desc ? "desc" : "asc",
    },
    filters: {
      artist: filters.artist,
      genre: filters.genres,
    },
    search: debouncedSearchText,
    queryOptions: {
      placeholderData: (oldData) => oldData,
    },
  });
  const { data: genresData, error: genresError } = unwrapQueryResult(genresResult);
  const { data: tracksData, error: tracksError } = unwrapQueryResult(tracksResult);

  useEffect(() => {
    if (searchText) {
      setSorting([]);
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      });
      setFilters({
        artist: "",
        genres: "",
      });
      setIsSearching(isLoadingTracks);
    } else {
      setIsSearching(false);
    }
  }, [
    searchText,
    isLoadingTracks,
    setSorting,
    setPagination,
    setFilters,
    setIsSearching,
  ]);

  if (tracksError) {
    toast.error(TRACk_API_ERROR_MESSAGES[tracksError.type]);
  }
  if (genresError) {
    toast.error(GENRE_API_ERROR_MESSAGES[genresError.type]);
  }

  const isLoading = isLoadingTracks || isLoadingGenres;

  return { genresData, tracksData, isLoading };
};
