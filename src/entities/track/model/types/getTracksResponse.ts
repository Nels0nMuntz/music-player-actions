import { z } from "zod";
import { getTracksResponseSchema } from "../schemas/getTracksResponseSchema";

export type GetTracksResponse = z.infer<typeof getTracksResponseSchema>;
