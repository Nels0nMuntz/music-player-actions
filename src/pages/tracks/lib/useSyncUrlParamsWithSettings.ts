import { useEffect } from "react";
import {
  SortKey,
  useFilters,
  usePagination,
  useSearchText,
  useSettingsActions,
  useSorting,
} from "@/shared/model";
import { useReadUrlParams } from "./useReadUrlParams";
import { PAGINATION_PAGE_SIZE } from "@/shared/lib";
import { useUpdateUrlParams } from "./updateUrlParams";

export const useSyncUrlParamsWithSettings = () => {
  const sorting = useSorting();
  const filters = useFilters();
  const pagination = usePagination();
  const searchText = useSearchText();
  const { sortKey, sortOrder, artistFilter, genreFilter, search, page } =
    useReadUrlParams();
  const { setSorting, setFilters, setPagination, setSearchText } = useSettingsActions();
  const updateUrlParams = useUpdateUrlParams();

  useEffect(() => {
    setSorting(
      sortKey ? [{ id: sortKey, desc: sortOrder === "desc" }] : []
    );
  }, [sortKey, sortOrder, setSorting]);

  useEffect(() => {
    setFilters({
      artist: artistFilter,
      genres: genreFilter,
    });
  }, [artistFilter, genreFilter, setFilters]);

  useEffect(() => {
    setPagination({
      pageIndex: page,
      pageSize: PAGINATION_PAGE_SIZE,
    });
  }, [page, setPagination]);

  useEffect(() => {
    setSearchText(search);
  }, [search, setSearchText]);

  useEffect(() => {
    if (sorting.length === 0) {
      updateUrlParams({
        sortKey: undefined,
        sortOrder: undefined,
      });
      return;
    }
    updateUrlParams({
      sortKey: sorting[0].id as SortKey,
      sortOrder: sorting[0].desc ? "desc" : "asc",
    });
  }, [sorting, updateUrlParams]);

  useEffect(() => {
    updateUrlParams({
      artistFilter: filters.artist,
      genreFilter: filters.genres,
    });
  }, [filters, updateUrlParams]);

  useEffect(() => {
    updateUrlParams({
      page: pagination.pageIndex,
    });
  }, [pagination, updateUrlParams]);

  useEffect(() => {
    updateUrlParams({
      search: searchText,
    });
  }, [searchText, updateUrlParams]);
};
