import { Result } from "@mobily/ts-belt";
import { AppError, QUERY_KEYS } from "@/shared/api";
import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { getTrack } from "./getTrack";
import { Track } from "../model/types/track";
import { TrackErrorType } from "../model/types/trackErrorType";

interface Options {
  slug: string;
  queryOptions?: Partial<
    QueryObserverOptions<Result<Track, AppError<TrackErrorType>> | undefined>
  >;
}

export const useTrackQuery = ({ slug, queryOptions }: Options) => {
  const {
    data: trackData,
    error: trackError,
    isLoading: isLoadingTrack,
  } = useQuery({
    ...queryOptions,
    queryKey: [QUERY_KEYS.tracks, slug],
    queryFn: () => getTrack(slug),
    staleTime: 1000 * 60 * 5,
  });
  return { trackData, trackError, isLoadingTrack };
};
