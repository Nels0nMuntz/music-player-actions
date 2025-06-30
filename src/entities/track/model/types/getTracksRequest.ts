import { SortOrder, SortKey } from "@/shared/model";

export interface GetTracksRequest {
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  sorting?: {
    sortBy: SortKey;
    order: SortOrder;
  };
  filters?: {
    genre?: string;
    artist?: string;
  };
  search?: string;
}
