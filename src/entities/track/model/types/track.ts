import { z } from "zod";
import { trackSchema } from "../schemas/trackSchema";

export type Track = z.infer<typeof trackSchema>;