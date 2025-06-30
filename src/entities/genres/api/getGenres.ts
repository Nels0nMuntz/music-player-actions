import { R, Result } from "@mobily/ts-belt";
import { api } from "@/shared/api";
import { parseApiResponse } from "@/shared/lib";
import { AppError } from "@/shared/api";
import { getGenresSchema } from "../model/schemas/getGenresSchema";
import { GenreErrorType } from "../model/types/genreErrorType";
import { Genre } from "../model/types/genre";

export const getGenres = async (): Promise<
  Result<Genre[], AppError<GenreErrorType>>
> => {
  try {
    const response = await api.get("genres");
    const parsed = parseApiResponse(response, getGenresSchema);
    return R.Ok(parsed);
  } catch (error) {
    return R.Error(AppError.wrap(error, GenreErrorType.NotFound));
  }
};
