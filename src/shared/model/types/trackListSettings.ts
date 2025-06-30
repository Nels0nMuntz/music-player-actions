import { z } from "zod";
import { sortKeySchema } from "../schemas/sortKeySchema";
import { sortOrderSchema } from "../schemas/sortOrderSchema";

export interface TrackListSettings {
    sortKey: SortKey;
    sortOrder: SortOrder;
    artistFilter: string;
    genreFilter: string;
    search: string;
    page: number;
}
export type SortKey = z.infer<typeof sortKeySchema>;
export type SortOrder = z.infer<typeof sortOrderSchema>;