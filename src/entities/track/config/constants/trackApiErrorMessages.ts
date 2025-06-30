import { TrackErrorType } from "../../model/types/trackErrorType";

export const TRACk_API_ERROR_MESSAGES = {
  [TrackErrorType.TarckNotFound]: "Failed to load track.",
  [TrackErrorType.TarcksNotFound]: "Failed to load list of tracks.",
} as const;
