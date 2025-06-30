import { GenreErrorType } from "../../model/types/genreErrorType";

export const GENRE_API_ERROR_MESSAGES = {
  [GenreErrorType.NotFound]: "Failed to load genres.",
} as const;
