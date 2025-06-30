import { z } from "zod";

export const sortKeySchema = z.enum([
  "title",
  "artist",
  "album",
  "added",
]);