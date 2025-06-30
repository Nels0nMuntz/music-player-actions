import { api } from "@/shared/api";
import { CreateTrackRequest } from "../model/types/createTrackRequest";
import { Track } from "../model/types/track";

export const createTrack = (data: CreateTrackRequest): Promise<Track> =>
  api.post("tracks", {
    body: data,
  });
