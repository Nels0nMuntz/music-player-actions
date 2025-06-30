import { api } from "@/shared/api";
import { parseApiResponse } from "@/shared/lib";
import { DeleteTracksResponse } from "../model/types/deleteTracksResponse";
import { deleteTrackResponseSchema } from "../model/schemas/deleteTrackResponseSchema";

export const deleteTracks = async (
  ids: string[]
): Promise<DeleteTracksResponse> => {
  const response = await api.post("tracks", {
    params: "delete",
    body: { ids },
  });
  return parseApiResponse(response, deleteTrackResponseSchema);
};
