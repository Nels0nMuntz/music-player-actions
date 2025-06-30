import { z } from "zod";
import { trackSchema } from "./trackSchema";

export const getTracksResponseSchema = z.object({
  data: z.array(trackSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});
