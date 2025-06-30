import { toast } from "sonner";
import { GENRE_API_ERROR_MESSAGES, useGenresQuery } from "@/entities/genres";
import { CreateTrackRequest, Track } from "@/entities/track";
import { TrackForm } from "@/shared/ui";
import { unwrapQueryResult } from "@/shared/lib";
import { useEditTrackMutation } from "../api/useEditTrackMutation";

interface Props {
  track: Track;
  onUpdated: () => void;
}

export const EditTrackForm: React.FC<Props> = ({ track, onUpdated }) => {
  const { genresResult } = useGenresQuery();
  const { data = [], error } = unwrapQueryResult(genresResult);
  const { mutate, isPending } = useEditTrackMutation({ onSuccess: onUpdated });
  const handleSubmit = (values: CreateTrackRequest) => {
    mutate({
      id: track.id,
      title: values.title.trim(),
      artist: values.artist.trim(),
      album: values.album?.trim(),
      coverImage: values.coverImage?.trim(),
      genres: values.genres,
    });
  };

  if (error) {
    toast.error(GENRE_API_ERROR_MESSAGES[error.type]);
  }

  return (
    <TrackForm
      onSubmit={handleSubmit}
      genres={data}
      isSubmitting={isPending}
      values={{
        title: track.title,
        artist: track.artist,
        album: track.album,
        genres: track.genres.map((item) => ({ label: item, value: item })),
        coverImage: track.coverImage,
      }}
    />
  );
};
