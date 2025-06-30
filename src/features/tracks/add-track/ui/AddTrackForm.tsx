import { toast } from "sonner";
import { GENRE_API_ERROR_MESSAGES, useGenresQuery } from "@/entities/genres";
import { CreateTrackRequest } from "@/entities/track";
import { TrackForm } from "@/shared/ui";
import { unwrapQueryResult } from "@/shared/lib";
import { useAddTrackMutation } from "../api/useAddTrackMutation";

interface Props {
  onSubmitted: () => void;
}

export const AddTrackForm: React.FC<Props> = ({ onSubmitted }) => {
  const { genresResult } = useGenresQuery();
  const { data = [], error } = unwrapQueryResult(genresResult);
  const { mutate, isPending } = useAddTrackMutation({ onSuccess: onSubmitted });
  const handleSubmit = (values: CreateTrackRequest) => {
    mutate({
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
      // actions={
      //   <DialogFooter className="sm:justify-end">
      //     <DialogClose asChild>
      //       <Button type="button" variant="secondary" className="min-w-24">
      //         Close
      //       </Button>
      //     </DialogClose>
      //     <Button type="submit" variant="default" disabled={isPending} className="min-w-24">
      //       {isPending ? <Loader2 className="animate-spin" /> : "Create"}
      //     </Button>
      //   </DialogFooter>
      // }
    />
  );
};
