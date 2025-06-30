import { z } from "zod";

export const getGenresSchema = z.array(z.string());
