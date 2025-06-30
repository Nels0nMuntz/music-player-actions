import { R, Result } from "@mobily/ts-belt";
import { api, AppError } from "@/shared/api";
import { parseApiResponse } from "@/shared/lib";
import { Track } from "../model/types/track";
import { trackSchema } from "../model/schemas/trackSchema";
import { TrackErrorType } from "../model/types/trackErrorType";

export const getTrack = async (
  slug: string
): Promise<Result<Track, AppError<TrackErrorType>>> => {
  try {
    const response = await api.get("tracks", { params: slug });
    const parsed = parseApiResponse(response, trackSchema);
    return R.Ok(parsed);
  } catch (error) {
    return R.Error(AppError.wrap(error, TrackErrorType.TarckNotFound));
  }
};
