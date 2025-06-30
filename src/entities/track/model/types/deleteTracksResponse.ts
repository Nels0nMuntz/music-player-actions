import { z } from "zod";
import { deleteTrackResponseSchema } from "../schemas/deleteTrackResponseSchema";

export type DeleteTracksResponse = z.infer<typeof deleteTrackResponseSchema>;