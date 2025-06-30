import { z } from "zod";

export const deleteTrackResponseSchema = z.object({
  success: z.array(z.string()),
  failed: z.array(z.string()),
});
